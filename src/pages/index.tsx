import React, { Fragment } from 'react';
import { NecordInstallScriptCopyBtn } from '@/components/necord-install-script-copy-btn';
import { Button } from '@/components/ui/button';
import Head from '@docusaurus/Head';
import ColorModeSwitch from '@/components/color-mode-switch';
import { ColorModeProvider } from '@docusaurus/theme-common/internal';


export default function Home() {
	const openLink = (url: string, onSite: boolean = false) => {
		window.open(url, onSite ? '_self' : '_blank');
	};


	return (
		<Fragment>
			<ColorModeProvider>
				<Head>
					<title>NECORD - The best way to create Discord bots with NestJS</title>
					<meta
						name="description"
						content="The best way to create Discord bots with NestJS"
					/>
				</Head>
				<div
					className="w-full w-screen-md lg:w-4xl px-4 mx-auto flex flex-col items-center justify-center space-y-6 overflow-hidden h-screen">
					<ColorModeSwitch />

					<h1 className="text-3xl md:text-7xl font-bold text-center text-primary">
						The best way to create{' '}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
						Discord
					</span>{' '}
						bots with{' '}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
						NestJS
					</span>
					</h1>

					<p className="text-center text-sm md:text-lg text-muted-foreground">
						This package uses the best of the NodeJS world under the hood.{' '}
						<a href="https://discord.js.org" target="_blank" rel="noopener noreferrer">
							Discord.js
						</a>{' '}
						is the most powerful library for creating bots and{' '}
						<a href="https://nestjs.com" target="_blank" rel="noopener noreferrer">
							Nest.js
						</a>{' '}
						is a progressive framework for creating well-architectured applications. This
						module provides fast and easy way for creating Discord bots and deep integration
						with your NestJS application.
					</p>

					<div className="flex flex-col items-center justify-center space-y-3">
						<div className="flex flex-row gap-x-4 gap-y-2 h-fit flex-wrap justify-center items-center">
							<Button onClick={() => openLink('/introduction', true)} className="cursor-pointer">
								Documentation
							</Button>

							<Button
								variant="outline"
								onClick={() => openLink('https://discord.com/invite/mcBYvMTnwP')}
								className="cursor-pointer"
							>
								Community
							</Button>

							<Button
								variant="outline"
								onClick={() => openLink('https://github.com/necordjs')}
								className="cursor-pointer"
							>
								GitHub
							</Button>
						</div>

						<small className="text-center text-muted-foreground text-xs my-2">
							or install it with package manager:
						</small>

						<NecordInstallScriptCopyBtn />
					</div>
				</div>
			</ColorModeProvider>
		</Fragment>
	);
}
