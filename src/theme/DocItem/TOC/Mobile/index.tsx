import { ThemeClassNames } from '@docusaurus/theme-common';
import TOCCollapsible from '@theme/TOCCollapsible';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useDocTOCWithTitle } from '../useDocTOCWithTitle';
import styles from './styles.module.css';

export default function DocItemTOCMobile(): ReactNode {
	const { toc, minHeadingLevel, maxHeadingLevel } = useDocTOCWithTitle();

	return (
		<TOCCollapsible
			toc={toc}
			minHeadingLevel={minHeadingLevel}
			maxHeadingLevel={maxHeadingLevel}
			className={clsx(ThemeClassNames.docs.docTocMobile, styles.tocMobile)}
		/>
	);
}
