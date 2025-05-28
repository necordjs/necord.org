import React from 'react';
import { ColorMode, useColorMode } from '@docusaurus/theme-common';
import { MoonIcon, SunIcon } from 'lucide-react';
import IconSystemColorMode from '@/components/Icon/SystemColorMode';



function getNextColorMode(currentMode: ColorMode) {
	switch (currentMode) {
		case null:
			return 'light';
		case 'light':
			return 'dark';
		case 'dark':
			return null;
		default:
			throw new Error(`Unknown color mode: ${currentMode}`);
	}
}

function getIconForColorMode(colorMode: ColorMode) {
	switch (colorMode) {
		case 'light':
			return <SunIcon className="w-5 h-5" />;
		case 'dark':
			return <MoonIcon className="w-5 h-5" />;
		default:
			return <IconSystemColorMode className="w-5 h-5" />;
	}
}

function ColorModeSwitch() {
	const { setColorMode, colorModeChoice } = useColorMode();

	const toggleColorMode = () => {
		const nextMode = getNextColorMode(colorModeChoice);
		setColorMode(nextMode);
	};

	return (
		<button
			className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
			onClick={toggleColorMode}
			aria-label="Toggle color mode"
		>
			{getIconForColorMode(colorModeChoice)}
		</button>
	);
}

export default React.memo(ColorModeSwitch);
