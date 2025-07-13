import { useColorMode } from '@docusaurus/theme-common';
import { cn } from '../lib/utils';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark as darkTheme, vs as whiteTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface File {
	name: string;
	content: string;
}

interface TabbedCodeBlockProps {
	files: File[];
}

export default function TabbedCodeBlock({ files }: TabbedCodeBlockProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<motion.div
			layout
			className="col-span-12 rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-[#1e1e1e]"
		>
			<Header
				files={files.map(f => f.name)}
				activeIndex={activeIndex}
				onChange={setActiveIndex}
			/>

			<Content code={files[activeIndex].content} />
		</motion.div>
	);
}

interface HeaderProps {
	files: string[];
	activeIndex: number;
	onChange: (index: number) => void;
}

function Header({ files, activeIndex, onChange }: HeaderProps) {
	return (
		<div className="flex items-center rounded-t-xl bg-gray-50 dark:bg-[#252526]">
			<div className="hidden space-x-2 p-5 sm:flex">
				<span className="h-3 w-3 rounded-full bg-red-500"></span>
				<span className="h-3 w-3 rounded-full bg-yellow-500"></span>
				<span className="h-3 w-3 rounded-full bg-green-500"></span>
			</div>

			<div className="flex w-full overflow-x-auto overflow-y-hidden">
				{files.map((file, idx) => (
					<button
						key={file}
						onClick={() => onChange(idx)}
						className={cn(
							'relative px-4 py-3 whitespace-nowrap text-gray-700 transition-colors duration-100 dark:text-gray-300',
							{ 'font-semibold': idx === activeIndex }
						)}
					>
						{file}

						{idx === activeIndex && (
							<motion.span
								layoutId="underline"
								className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-red-500 dark:bg-red-400"
							/>
						)}
					</button>
				))}
			</div>
		</div>
	);
}

interface ContentProps {
	code: string;
}


function Content({ code }: ContentProps) {
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';

	return (
		<div className="w-full overflow-x-auto overflow-y-hidden" data-theme={colorMode}>
			<AnimatePresence mode="wait">
				<motion.div
					key={code} // triggers re-mount on tab change
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="flex min-w-[760px]"
				>
					<SyntaxHighlighter
						showLineNumbers
						language="typescript"
						style={isDark ? darkTheme : whiteTheme}
						className="w-full px-3 pt-2 pb-4! mb-0!"
					>
						{code}
					</SyntaxHighlighter>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
