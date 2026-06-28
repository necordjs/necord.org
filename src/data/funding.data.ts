export const fundingLinks = {
	openCollective: 'https://opencollective.com/necord',
	githubSponsors: 'https://github.com/sponsors/necordjs',
	tribute: {
		rub: 'https://t.me/tribute/app?startapp=dqDg',
		eur: 'https://t.me/tribute/app?startapp=dqDh'
	},
	contact: {
		email: 'contact@socketsomeone.me',
		href: 'mailto:contact@socketsomeone.me'
	}
} as const;

type CryptoWallet = {
	symbol: string;
	name: string;
	chain: string;
	address: string;
};

export const cryptoWallets = [
	{
		symbol: 'USDT',
		name: 'Tether',
		chain: 'TRC20',
		address: 'TD1jeMXpdyv3Hk7swBPdrHgV4FYPH9SBaa'
	},
	{
		symbol: 'TON',
		name: 'Toncoin',
		chain: 'TON',
		address: 'UQBUu-CxUCZx0jvd-EJiguHHWA5pafpdXutHEBuExHoR-tMz'
	},
	{
		symbol: 'BTC',
		name: 'Bitcoin',
		chain: 'BTC',
		address: 'bc1qu5hpfns9x6ygfnulnhxedkdp26l3wkdunkuz6h'
	},
	{
		symbol: 'ETH',
		name: 'Ethereum',
		chain: 'ETH',
		address: '0xe8EE73E47b8ba3e44d25F1566fEbd53dFf844cC3'
	},
	{
		symbol: 'SOL',
		name: 'Solana',
		chain: 'SOL',
		address: 'FAPYqgbvyf3p9VCxFzyGNYEJutZpE9DHPRbwvNXtV7Gx'
	}
] as const satisfies readonly CryptoWallet[];
