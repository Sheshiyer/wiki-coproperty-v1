// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Co.Property Wiki',
			customCss: [
				'./src/styles/custom.css',
			],
			social: [], // No public social links for internal wiki
			sidebar: [
				{
					label: 'Strategy',
					autogenerate: { directory: 'strategy' },
				},
				{
					label: 'Marketing',
					autogenerate: { directory: 'marketing' },
				},
				{
					label: 'Product',
					autogenerate: { directory: 'product' },
				},
				{
					label: 'Technical',
					autogenerate: { directory: 'technical' },
				},
			],
		}),
	],
});
