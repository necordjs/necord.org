import { ThemeClassNames } from '@docusaurus/theme-common';
import TOC from '@theme/TOC';
import type { ReactNode } from 'react';

import { useDocTOCWithTitle } from '../useDocTOCWithTitle';

export default function DocItemTOCDesktop(): ReactNode {
	const { toc, minHeadingLevel, maxHeadingLevel } = useDocTOCWithTitle();

	return (
		<TOC
			toc={toc}
			minHeadingLevel={minHeadingLevel}
			maxHeadingLevel={maxHeadingLevel}
			className={ThemeClassNames.docs.docTocDesktop}
		/>
	);
}
