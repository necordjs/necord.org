import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs';
import { themes } from 'prism-react-renderer';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.oceanicNext;

const defaultLocale = 'en';
const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const isPreview = process.env.NODE_ENV === 'preview';
const isProd = process.env.NODE_ENV === 'production';
const isGHPages = process.env.DEPLOY_TARGET === 'gh-pages';

const copyright = `Copyright © 2021—${new Date().getFullYear()} • Built by <a target="_blank" href="https://github.com/SocketSomeone">Alexey Filippov</a> and <a target="_blank" href="https://github.com/SocketSomeone/necord/graphs/contributors">Others</a> with 💖`;

const config: Config = {
	title: 'Necord',
	titleDelimiter: '|',
	tagline: 'A module for creating Discord bots using NestJS, based on Discord.js',
	url: isGHPages ? 'https://necord.js.org' : 'https://necord.org',
	baseUrl: isGHPages ? '/' : '/',
	onBrokenLinks: 'throw',
	onBrokenAnchors: 'throw',
	onBrokenMarkdownLinks: 'warn',
	onDuplicateRoutes: 'throw',
	favicon: 'img/favicon.ico',
	organizationName: 'necordjs', // Usually your GitHub org/username.
	projectName: 'necord.org', // Usually your repo name.
	trailingSlash: isPreview,
	presets: [
		[
			'classic',
			{
				debug: isDev,
				docs: {
					sidebarPath: require.resolve('./sidebars.ts'),
					editUrl: ({ locale, versionDocsDirPath, docPath }) => {
						if (locale !== defaultLocale) {
							return `https://crowdin.com/project/necord/${locale}`;
						}

						return `https://github.com/necordjs/necord.org/edit/master/${versionDocsDirPath}/${docPath}`;
					},
					path: 'content',
					routeBasePath: '/',
					showLastUpdateAuthor: true,
					showLastUpdateTime: true,
					remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]]
				} satisfies DocsOptions,
				blog: {
					editUrl: ({ locale, blogDirPath, blogPath }) => {
						if (locale !== defaultLocale) {
							return `https://crowdin.com/project/necord/${locale}`;
						}

						return `https://github.com/necordjs/necord.org/edit/master/${blogDirPath}/${blogPath}`;
					},
					path: 'blog',
					routeBasePath: '/blog',
					showReadingTime: true,
					remarkPlugins: [
						[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]
					],
					postsPerPage: 5,
					feedOptions: {
						type: 'all',
						title: 'Necord Blog',
						description: 'Keep up to date with the latest news and updates from Necord',
						copyright,
						xslt: true
					},
					blogDescription: 'Read blog posts about Necord from the team',
					blogSidebarCount: 'ALL',
					blogSidebarTitle: 'All our posts'
				},
				pages: {
					path: 'src/pages'
				},
				theme: {
					customCss: [
						require.resolve('./src/css/admonition.scss'),
						require.resolve('./src/css/algolia.scss'),
						require.resolve('./src/css/custom.scss'),
						require.resolve('./src/css/font.scss'),
						require.resolve('./src/css/layout.scss'),
						require.resolve('./src/css/navbar.scss')
					]
				},
				sitemap: {
					changefreq: 'weekly',
					lastmod: 'date',
					priority: 0.5,
					ignorePatterns: ['/contributing/**']
				},
				googleTagManager: {
					containerId: 'GTM-P29SVPM'
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
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com'
			}
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'true'
			}
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
			id: 'banner',
			content:
				'⭐️ If you like Necord, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/necordjs/necord">GitHub</a>! ⭐️',
			backgroundColor: '#c12549',
			textColor: '#fff',
			isCloseable: true
		},
		docs: {
			versionPersistence: 'none',
			sidebar: {
				hideable: false,
				autoCollapseCategories: false
			}
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
					to: '/introduction'
				},
				{
					to: 'blog',
					label: 'Blog',
					position: 'left'
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
					label: 'Changelog',
					position: 'left',
					href: 'https://github.com/necordjs/necord/releases'
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
					to: '/contributing/funding',
					position: 'right',
					className: 'header-support-link',
					'aria-label': 'Support Necord'
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
			links: [
				{
					title: 'Support us',
					items: [
						{ label: 'Donate', to: '/contributing/funding' },
						{ label: 'Contribute', to: '/contributing/contribution-guide' },
						{ label: 'Translate', href: 'https://crowdin.com/project/necord' }
					]
				},
				{
					title: 'Community',
					items: [
						{ label: 'Discord', href: 'https://discord.com/invite/mcBYvMTnwP' },
						{ label: 'GitHub Organization', href: 'https://github.com/necordjs' },
						{ label: 'NPM Organization', href: 'https://www.npmjs.com/org/necord' }
					]
				},
				{
					title: 'More',
					items: [
						{ label: 'Blog', href: '/blog' },
						{ label: 'Changelog', href: 'https://github.com/necordjs/necord/releases' }
					]
				},
				{
					title: 'Our Sponsors',
					items: [
						{ label: 'Become a Sponsor', href: 'https://opencollective.com/necord' },
						{
							className: 'footer__opencollective',
							html: `<a href="https://opencollective.com/necord" target="_blank"><img src="https://opencollective.com/necord/backers.svg?width=500" alt="Backers" /></a>`
						}
					]
				}
			],
			logo: {
				alt: 'Necord Logo',
				src: 'img/logo.svg',
				href: 'https://necord.org'
			},
			copyright
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
		],
		['./src/plugins/tailwind.plugin.ts', {}]
	],
	i18n: {
		defaultLocale,
		locales: ['en', 'ru', 'pt-BR'],
		path: 'i18n'
	}
};

module.exports = config;
