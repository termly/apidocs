// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.termly.io',
	integrations: [
		starlight({
			title: 'Termly API Docs',
			logo: {
				src: './src/assets/logo.svg',
				alt: 'Termly API Docs',
				replacesTitle: true,
			},
			social: {
				github: 'https://github.com/termly/termly-api-docs',
			},
			sidebar: [
				{
					label: 'Authentication',
					items: [
						{ label: 'Authentication', slug: 'introduction/authentication' },
						{ label: 'Make a Request', slug: 'introduction/make-a-request' },
					],
				},
				{
					label: 'Quickstart',
					items: [
						{ label: 'Node.js Auth Example', slug: 'quickstart/node-js-example' },
						{ label: 'CMP Integration', slug: 'quickstart/cmp-integration' },
					]
				},
				{
					label: 'Endpoints',
					items: [
						{
							label: 'Banners',
							items: [
								{ label: 'GET', slug: 'endpoints/banners-get' },
								{ label: 'PUT', slug: 'endpoints/banners-put' },
							]
						},
						{
							label: 'Collaborators',
							items: [
								{ label: 'GET', slug: 'endpoints/collaborators-get' },
								{ label: 'PUT', slug: 'endpoints/collaborators-put' },
								{ label: 'POST', slug: 'endpoints/collaborators-post' },
								{ label: 'DELETE', slug: 'endpoints/collaborators-delete' },
							]
						},
						{
							label: 'Cookies',
							items: [
								{ label: 'GET', slug: 'endpoints/cookies-get' },
								{ label: 'PUT', slug: 'endpoints/cookies-put' },
								{ label: 'POST', slug: 'endpoints/cookies-post' },
								{ label: 'DELETE', slug: 'endpoints/cookies-delete' },
							]
						},
						{
							label: 'Custom Consent Themes',
							items: [
								{ label: 'GET', slug: 'endpoints/custom-consent-themes-get' },
								{ label: 'PUT', slug: 'endpoints/custom-consent-themes-put' },
								{ label: 'POST', slug: 'endpoints/custom-consent-themes-post' },
								{ label: 'DELETE', slug: 'endpoints/custom-consent-themes-delete' },
							]
						},
						{
							label: 'Documents',
							items: [
								{ label: 'GET', slug: 'endpoints/document-preview' },
								{ label: 'POST', slug: 'endpoints/publish-cookie-policy' },
							]
						},
						{
							label: 'Scan',
							items: [
								{ label: 'POST', slug: 'endpoints/trigger-scan' },
							]
						},
						{
							label: 'Scan Reports',
							items: [
								{ label: 'GET', slug: 'endpoints/scan-reports-get' },
							]
						},
						{
							label: 'Websites',
							items: [
								{ label: 'GET', slug: 'endpoints/websites-get' },
								{ label: 'PUT', slug: 'endpoints/websites-put' },
								{ label: 'POST', slug: 'endpoints/websites-post' },
								{ label: 'DELETE', slug: 'endpoints/websites-delete' },
							]
						},
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Query', slug: 'other/query' },
						{ label: 'Results Paging', slug: 'other/results-paging' },
						{ label: 'Public Key', slug: 'other/public-key' },
						{ label: 'Signature', slug: 'other/signature' },
						{ label: 'Collaborator Roles', slug: 'other/collaborator-roles' },
						{ label: 'Request Errors', slug: 'other/request-errors' },
						{ label: 'Error Object', slug: 'other/error-object' },
						{ label: 'Validation Error Object', slug: 'other/validation-error-object' },
					],
				},
			],
		}),
	],
});
