# Termly Public API Documentation

Source for the public Termly API documentation, published at **[docs.termly.io](https://docs.termly.io)**.

This is the partner-facing reference for the Termly Public API — authentication, request
signing, and every supported endpoint. It is a [Starlight](https://starlight.astro.build)
site built with [Astro](https://astro.build).

## Repository layout

```
src/
├── assets/               # logo and images
├── content/
│   └── docs/
│       ├── index.mdx     # landing page
│       ├── introduction/ # authentication, making a request
│       ├── quickstart/   # worked examples
│       ├── endpoints/    # one page per endpoint + verb
│       └── other/        # signature, query, paging, error objects
└── content.config.ts
astro.config.mjs          # site config and sidebar
```

Every `.md` / `.mdx` file under `src/content/docs/` becomes a route based on its path —
`src/content/docs/endpoints/websites-get.md` is served at `/endpoints/websites-get/`.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server on port 4321 |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Adding a page

1. Add a `.md` file in the appropriate `src/content/docs/` subdirectory.
2. Give it frontmatter with a `title` and `description`:

   ```yaml
   ---
   title: Websites
   description: A guide on how to use the Websites endpoint
   ---
   ```

3. Add it to the `sidebar` array in `astro.config.mjs` — pages are **not** picked up
   automatically. Use the slug without the `src/content/docs/` prefix or file extension,
   e.g. `endpoints/websites-get`.
4. Run `npm run build` before opening a PR. The build catches broken internal links and
   invalid frontmatter.

## Deployment

Merges to `main` publish automatically to [docs.termly.io](https://docs.termly.io) via
GitHub Pages, using the `Deploy Astro site to Pages` workflow in
`.github/workflows/astro.yml`.

Pull requests get a build check (`.github/workflows/ci.yml`) but no preview deployment —
GitHub Pages only serves `main`. To see rendered changes, run `npm run dev` locally.

Termly staff: the Pages setup, DNS, and rollback procedure are documented in the
[Public API Docs — hosting](https://termly.slite.com/app/docs/Bf2lxbjz-XOxfU) runbook
in Slite.

## Contributing

The documentation must describe the API as it actually behaves. When an endpoint changes,
update these docs in the same cycle — partners integrate directly against what is
published here.
