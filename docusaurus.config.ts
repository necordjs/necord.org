import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs';
import { themes } from 'prism-react-renderer';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.oceanicNext;

const defaultLocale = 'en';
const isDev = process.env.NODE_ENV === 'development';

const config: Config = {
	title: 'Necord',
	titleDelimiter: '|',
	tagline: 'A module for creating Discord bots using NestJS, based on Discord.js',
	url: 'https://necord.org',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenAnchors: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'necordjs', // Usually your GitHub org/username.
	projectName: 'necord.org', // Usually your repo name.
	presets: [
		[
			'classic',
			{
				debug: process.env.NODE_ENV !== 'production',
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: ({ locale, versionDocsDirPath, docPath }) => {
						if (locale === defaultLocale) {
							return `https://crowdin.com/project/necord/${locale}`
						}

						return `https://github.com/necordjs/necord.org/edit/master/${versionDocsDirPath}/${docPath}`;
					},
					path: 'content',
					routeBasePath: '/',
					showLastUpdateAuthor: true,
					showLastUpdateTime: true,
					remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]]
				} satisfies DocsOptions,
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
			} satisfies Preset.Options
		]
	],
	headTags: [
		{
			tagName: 'script',
			attributes: {
				type: 'application/ld+json'
			},
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org/',
				'@type': 'Organization',
				name: 'Necord',
				description: 'A module for creating Discord bots using NestJS, based on Discord.js',
				url: 'https://necord.org',
				image: 'https://necord.org/img/preview.png',
				logo: 'https://necord.org/img/logo.svg'
			})
		}
	],
	themeConfig: {
		algolia: {
			appId: 'U7YH0EPYI9',
			apiKey: 'c41976c1ed280e75acc3e9efd4aaaf00',
			indexName: 'necord',
			contextualSearch: true,
			searchPagePath: false,
			insights: true
		},
		announcementBar: {
			content:
				'⭐️ If you like Necord, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/necordjs/necord">GitHub</a>! ⭐️'
		},
		prism: {
			additionalLanguages: [
				'java',
				'latex',
				'haskell',
				'matlab',
				'PHp',
				'powershell',
				'bash',
				'diff',
				'json',
				'scss'
			],
			defaultLanguage: 'typescript',
			magicComments: [
				{
					className: 'theme-code-block-highlighted-line',
					line: 'highlight-next-line',
					block: { start: 'highlight-start', end: 'highlight-end' }
				},
				{
					className: 'code-block-error-line',
					line: 'This will error'
				}
			],
			theme: lightCodeTheme,
			darkTheme: darkCodeTheme
		},
		metadata: [
			{
				name: 'keywords',
				content: 'discord, discord-bot, framework, necord, github, open-source'
			},
			{ hid: 'og:site_name', property: 'og:site_name', content: 'Necord' },
			{ hid: 'og:type', property: 'og:type', content: 'website' },
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
			{ hid: 'twitter:site', name: 'twitter:site', content: '@socketsomeone' },
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
				hid: 'twitter:image:alt',
				name: 'twitter:image:alt',
				content: 'Necord'
			}
		],
		navbar: {
			logo: {
				alt: 'Necord Logo',
				src: 'img/logo.svg'
			},
			items: [
				{
					label: 'Documentation',
					href: '/'
				},
				{
					label: 'Examples',
					position: 'left',
					href: 'https://github.com/necordjs/examples'
				},
				{
					label: 'Community',
					position: 'left',
					href: 'https://discord.com/invite/mcBYvMTnwP'
				},
				{
					type: 'localeDropdown',
					position: 'right',
					dropdownItemsAfter: [
						{
							type: 'html',
							value: '<hr style="margin: 0.3rem 0;">'
						},
						{
							href: 'https://crowdin.com/project/necord',
							label: 'Help Us Translate'
						}
					]
				},
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
			// TODO: Add links
			// links: [
			// 	{
			// 		title: 'Help us',
			// 		items: [
			// 			{ label: 'Donate', href: 'https://opencollective.com/necord' },
			// 			{ label: 'Contribute', href: 'https://github.com/necordjs' },
			// 			{ label: 'Translate', href: 'https://crowdin.com/project/necord' }
			// 		]
			// 	}
			// ],
			// logo: {
			// 	alt: 'Necord Logo',
			// 	src: 'img/logo.svg',
			// 	href: 'https://necord.org'
			// },
			copyright: `Copyright © 2021 - ${new Date().getFullYear()} • Built by <a target="_blank" href="https://github.com/SocketSomeone">Alexey Filippov</a> and <a target="_blank" href="https://github.com/SocketSomeone/necord/graphs/contributors">Others</a> with 💖`
		}
	} satisfies Preset.ThemeConfig,
	plugins: [
		'docusaurus-plugin-sass',
		[
			'@docusaurus/plugin-pwa',
			{
				debug: true,
				offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
				pwaHead: [
					{
						tagName: 'link',
						rel: 'icon',
						href: '/img/logo-small.png'
					},
					{
						tagName: 'link',
						rel: 'manifest',
						href: '/manifest.json' // your PWA manifest
					},
					{
						tagName: 'meta',
						name: 'theme-color',
						content: '#c12549'
					},
					{
						tagName: 'meta',
						name: 'apple-mobile-web-app-capable',
						content: 'yes'
					},
					{
						tagName: 'meta',
						name: 'apple-mobile-web-app-status-bar-style',
						content: '#FFF'
					},
					{
						tagName: 'link',
						rel: 'apple-touch-icon',
						href: '/img/logo-small.png'
					},
					{
						tagName: 'link',
						rel: 'mask-icon',
						href: '/img/logo-small.png',
						color: '#c12549'
					},
					{
						tagName: 'meta',
						name: 'msapplication-TileImage',
						content: '/img/logo-small.png'
					},
					{
						tagName: 'meta',
						name: 'msapplication-TileColor',
						content: '#FFF'
					}
				]
			}
		]
	],
	i18n: {
		defaultLocale,
		locales: ['en', 'ru', 'pt-BR']
	}
};

module.exports = config;
