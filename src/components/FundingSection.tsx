import React, { useState } from 'react';
import { CopyIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const FundingSection = ({ children }) => {
	return (
		<div className="grid grid-cols-1 gap-4">
			{children}
		</div>
	);
};

const Item = ({ className, contentClass, children, title }) => (
	<div className={``}>
		<div className="text-md mb-2 font-medium text-gray-700 dark:text-gray-200">{title}</div>

		<div className={className}>{children}</div>
	</div>
);

const Button = ({ href, children, className }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className={`cursor-pointer rounded-lg px-4 py-2 text-sm text-white! ${className}`}
	>
		<button>{children}</button>
	</a>
);

type CryptoWalletProps = {
	symbol: string;
	name: string;
	chain: string; // e.g., TRC20, TON, BTC, ETH, SOL
	address: string;
};

const CryptoWallet = (wallet: CryptoWalletProps) => {
	const [copied, setCopied] = useState<string | null>(null);

	return (
		<div key={wallet.address} className="rounded bg-gray-100 p-3 dark:bg-gray-500/10">
			<div className="text-sm font-medium text-gray-700 dark:text-gray-200">
				<span className="font-bold">{wallet.name}</span>{' '}
				<span className="text-muted-foreground">({wallet.chain})</span>
			</div>
			<div className="mt-1 flex items-center justify-between gap-2">
				<code className="border-0! bg-transparent! text-xs break-all">
					{wallet.address}
				</code>
				<div className="relative">
					<button
						onClick={() => {
							navigator.clipboard.writeText(wallet.address);
							setCopied(wallet.address);
							setTimeout(() => setCopied(null), 1500);
						}}
						className="cursor-pointer rounded bg-red-600/10 p-1 text-xs text-red-400 hover:underline dark:bg-red-400/10"
						title="Copy"
					>
						<CopyIcon className="inline-block h-4 w-4" />
					</button>

					<AnimatePresence>
						{copied === wallet.address && (
							<motion.span
								initial={{ opacity: 0, y: -5 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -5 }}
								transition={{ duration: 0.3 }}
								className="absolute top-full left-1/2 mt-1 -translate-x-1/2 rounded bg-green-600 px-2 py-0.5 text-xs whitespace-nowrap text-white shadow-lg dark:bg-green-500"
							>
								Copied!
							</motion.span>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default Object.assign(FundingSection, {
	Item,
	Button,
	CryptoWallet
});
