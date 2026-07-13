import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useMemo } from 'react';

import { prependPageTitle } from './items';

export function useDocTOCWithTitle() {
	const { toc, metadata, frontMatter } = useDoc();
	const { tableOfContents } = useThemeConfig();

	const minHeadingLevel = frontMatter.toc_min_heading_level ?? tableOfContents.minHeadingLevel;
	const maxHeadingLevel = frontMatter.toc_max_heading_level ?? tableOfContents.maxHeadingLevel;

	const tocWithTitle = useMemo(
		() => prependPageTitle(metadata.title, toc, minHeadingLevel),
		[metadata.title, minHeadingLevel, toc]
	);

	return {
		toc: tocWithTitle,
		minHeadingLevel,
		maxHeadingLevel
	};
}
