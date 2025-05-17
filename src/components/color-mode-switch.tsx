import { useColorMode } from '@docusaurus/theme-common';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function ColorModeSwitch() {
	const { colorMode, setColorMode } = useColorMode();

	const toggleColorMode = () => {
		setColorMode(colorMode === 'light' ? 'dark' : 'light');
	};

	return (
		<button
			className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
			onClick={toggleColorMode}
			aria-label="Toggle color mode"
		>
			{colorMode === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
		</button>
	);
}
