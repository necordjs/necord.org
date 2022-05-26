// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

/** @type {import("@docusaurus/types").Config} */
const config = {
	title: 'Necord',
	tagline: 'A module for creating Discord bots using NestJS, based on Discord.js',
	url: 'https://necord.org',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'necordjs', // Usually your GitHub org/user name.
	projectName: 'necord', // Usually your repo name.
	presets: [
		[
			'classic',
			/** @type {import("@docusaurus/preset-classic").Options} */
			{
				debug: process.env.NODE_ENV !== 'production',
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/necordjs/documentation/tree/master',
					path: 'content',
					routeBasePath: '/',
					showLastUpdateAuthor: true,
					showLastUpdateTime: true,
					remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}]]
				},
				blog: false,
				pages: false,
				theme: {
					customCss: require.resolve('./styles/custom.scss')
				},
				sitemap: {
					changefreq: 'weekly',
					priority: 0.5,
					ignorePatterns: ['/contributing/**']
				},
				gtag: {
					trackingID: 'G-46VBZHXG63',
					anonymizeIP: false
				}
			}
		]
	],

	themeConfig:
	/** @type {import("@docusaurus/preset-classic").ThemeConfig} */
		{
			algolia: {
				appId: 'U7YH0EPYI9',
				apiKey: 'c41976c1ed280e75acc3e9efd4aaaf00',
				indexName: 'necord',
				contextualSearch: true
			},
			announcementBar: {
				content:
					'⭐️ If you like Necord, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/necordjs/necord">GitHub</a>! ⭐️'
			},
			metadata: [
				{
					name: 'keywords',
					content: 'discord, discord-bot, framework, necord, github, open-source'
				},
				{hid: 'og:site_name', property: 'og:site_name', content: 'Necord'},
				{hid: 'og:type', property: 'og:type', content: 'website'},
				{
					hid: 'og:image',
					property: 'og:image',
					content: 'https://necord.org/img/preview.png'
				},
				{
					hid: 'og:image:secure_url',
					property: 'og:image:secure_url',
					content: 'https://necord.org/img/preview.png'
				},
				{
					hid: 'og:image:alt',
					property: 'og:image:alt',
					content: 'Necord'
				},
				{hid: 'twitter:site', name: 'twitter:site', content: '@socketsomeone'},
				{
					hid: 'twitter:card',
					name: 'twitter:card',
					content: 'summary_large_image'
				},
				{
					hid: 'twitter:image',
					name: 'twitter:image',
					content: 'https://necord.org/img/preview.png'
				},
				{
					hid: "twitter:image:alt",
					name: "twitter:image:alt",
					content: "Necord",
				},
			],
			navbar: {
				logo: {
					alt: 'Necord Logo',
					src: 'img/logo.svg'
				},
				items: [
					{
						href: 'https://www.npmjs.com/package/necord',
						position: 'right',
						className: 'header-npm-link',
						'aria-label': 'NPM'
					},
					{
						href: 'https://github.com/necordjs/necord',
						position: 'right',
						className: 'header-github-link',
						'aria-label': 'GitHub repository'
					}
				]
			},
			colorMode: {
				defaultMode: 'light',
				disableSwitch: false,
				respectPrefersColorScheme: true
			},
			footer: {
				copyright: `Copyright © 2021 - ${new Date().getFullYear()} • Built by <a target="_blank" href="https://github.com/SocketSomeone">Alexey Filippov</a> and <a target="_blank" href="https://github.com/SocketSomeone/necord/graphs/contributors">Others</a> with 💖`
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme
			}
		},
	plugins: [
		'docusaurus-plugin-sass',
		[
			'@docusaurus/plugin-pwa',
			{
				debug: true,
				offlineModeActivationStrategies: [
					'appInstalled',
					'standalone',
					'queryString',
				],
				pwaHead: [
					{
						tagName: 'link',
						rel: 'icon',
						href: '/img/logo-small.png',
					},
					{
						tagName: 'link',
						rel: 'manifest',
						href: '/manifest.json', // your PWA manifest
					},
					{
						tagName: 'meta',
						name: 'theme-color',
						content: '#c12549',
					},
					{
						tagName: 'meta',
						name: 'apple-mobile-web-app-capable',
						content: 'yes',
					},
					{
						tagName: 'meta',
						name: 'apple-mobile-web-app-status-bar-style',
						content: '#FFF',
					},
					{
						tagName: 'link',
						rel: 'apple-touch-icon',
						href: '/img/logo-small.png',
					},
					{
						tagName: 'link',
						rel: 'mask-icon',
						href: '/img/logo-small.png',
						color: '#c12549',
					},
					{
						tagName: 'meta',
						name: 'msapplication-TileImage',
						content: '/img/logo-small.png',
					},
					{
						tagName: 'meta',
						name: 'msapplication-TileColor',
						content: '#FFF',
					}
				]
			}
		]]
};

module.exports = config;
