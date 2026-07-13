import type { TOCItem } from '@docusaurus/mdx-loader';

export const DOC_PAGE_TOP_ID = '';

const HTML_ENTITIES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
};

function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, character => HTML_ENTITIES[character]);
}

export function prependPageTitle(
	title: string,
	toc: readonly TOCItem[],
	level: number
): readonly TOCItem[] {
	return [
		{
			value: escapeHtml(title),
			id: DOC_PAGE_TOP_ID,
			level
		},
		...toc
	];
}
