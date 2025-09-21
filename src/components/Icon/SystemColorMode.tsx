import type { ReactNode } from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
	/**
	 * The color of the icon.
	 * @default 'currentColor'
	 */
	color?: string;
	className?: string;
}

export default function IconSystemColorMode(props: Props): ReactNode {
	return (
		<svg viewBox="0 0 24 24" width={24} height={24} {...props}>
			<path
				fill="currentColor"
				d="m12 21c4.971 0 9-4.029 9-9s-4.029-9-9-9-9 4.029-9 9 4.029 9 9 9zm4.95-13.95c1.313 1.313 2.05 3.093 2.05 4.95s-0.738 3.637-2.05 4.95c-1.313 1.313-3.093 2.05-4.95 2.05v-14c1.857 0 3.637 0.737 4.95 2.05z"
			/>
		</svg>
	);
}
