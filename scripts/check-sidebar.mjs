// Every docs page must be reachable from the astro.config.mjs sidebar.
// Starlight routes files automatically but does not add them to the nav,
// so a new page can build fine and still be unreachable.
import { readFile, readdir } from 'node:fs/promises';

const DOCS = 'src/content/docs';
const config = await readFile('astro.config.mjs', 'utf8');
const linked = new Set([...config.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]));

const walk = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else if (/\.mdx?$/.test(entry.name)) out.push(path);
  }
  return out;
};

const orphans = (await walk(DOCS))
  .map((file) => file.slice(DOCS.length + 1).replace(/\.mdx?$/, ''))
  .filter((slug) => slug !== 'index' && !linked.has(slug));

if (orphans.length) {
  console.error('Pages missing from the sidebar in astro.config.mjs:');
  for (const slug of orphans) console.error(`  ${slug}`);
  process.exit(1);
}

console.log(`All docs pages are reachable from the sidebar.`);
