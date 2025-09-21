import { ScriptCopyBtn } from '@/components/magicui/script-copy-btn';

export function NecordInstallScriptCopyBtn() {
	const customCommandMap = {
		npm: 'npm install necord discord.js',
		yarn: 'yarn add necord discord.js',
		pnpm: 'pnpm add necord discord.js'
	};
	return (
		<ScriptCopyBtn
			showMultiplePackageOptions={false}
			codeLanguage="shell"
			lightTheme=""
			darkTheme=""
			commandMap={customCommandMap}
		/>
	);
}
