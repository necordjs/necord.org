import React from 'react';
import { NecordInstallScriptCopyBtn } from '../components/NecordInstallScriptCopyBtn';
import { Button } from '@/components/ui/button';
import Head from '@docusaurus/Head';
import { HeartIcon } from 'lucide-react';
import { SiDiscord, SiNestjs } from 'react-icons/si';
import { TbArrowRightDashed } from 'react-icons/tb';
import Layout from '@theme/Layout';
import TabbedCodeBlock from '../components/TabbedCodeBlock';
import { IntroduceCodeData } from '../data/introduce-code.data';

export default function Home() {
	const openLink = (url: string, onSite: boolean = false) => {
		window.open(url, onSite ? '_self' : '_blank');
	};

	return (
		<Layout>
			<Head>
				<title>NECORD - The best way to create Discord bots with NestJS</title>
				<meta
					name="description"
					content="The best way to create Discord bots with NestJS"
				/>
			</Head>
			<div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 overflow-hidden px-4 min-h-screen lg:w-5xl">
				<h1 className="text-primary text-center text-3xl font-bold md:text-7xl!">
					The best way to create{' '}
					<span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
						Discord
					</span>{' '}
					bots with{' '}
					<span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
						NestJS
					</span>
				</h1>

				<p className="text-muted-foreground text-center text-sm md:text-lg">
					This package uses the best of the NodeJS world under the hood.{' '}
					<a href="https://discord.js.org" target="_blank" rel="noopener noreferrer">
						<img
							src={'https://discord.js.org/favicon.ico'}
							alt="Discord.js Logo"
							className="inline size-5 rounded"
						/>{' '}
						Discord.js
					</a>{' '}
					is the most powerful library for creating bots and{' '}
					<a href="https://nestjs.com" target="_blank" rel="noopener noreferrer">
						<SiNestjs className="inline size-5" /> Nest.js
					</a>{' '}
					is a progressive framework for creating well-architectured applications. This
					module provides fast and easy way for creating Discord bots and deep integration
					with your NestJS application.
				</p>

				<div className="flex flex-col items-center justify-center space-y-3">
					<div className="flex h-fit flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2">
						<Button
							onClick={() => openLink('/introduction', true)}
							className="cursor-pointer"
						>
							<TbArrowRightDashed size={20} />
							Get Started
						</Button>

						<Button
							variant="outline"
							onClick={() => openLink('https://discord.com/invite/mcBYvMTnwP')}
							className="cursor-pointer"
						>
							<SiDiscord />
							Community
						</Button>

						<Button
							onClick={() => openLink('/contributing/funding')}
							className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
						>
							<HeartIcon className="size-4" />
							Sponsor
						</Button>
					</div>

					<small className="text-muted-foreground my-2 text-center text-xs">
						or install it with package manager:
					</small>

					<NecordInstallScriptCopyBtn />
				</div>

				<div className="landing-container mx-auto mb-10 grid grid-cols-12 px-5 md:mb-28">
					<TabbedCodeBlock files={IntroduceCodeData} />
				</div>
			</div>
		</Layout>
	);
}
