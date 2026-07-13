import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useWindowSize } from '@docusaurus/theme-common';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import type { Props } from '@theme/DocItem/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './styles.module.css';

function useDocTOC() {
	const { frontMatter } = useDoc();
	const windowSize = useWindowSize();

	const hidden = frontMatter.hide_table_of_contents;
	const canRender = !hidden;

	const mobile = canRender ? <DocItemTOCMobile /> : undefined;
	const desktop =
		canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
			<DocItemTOCDesktop />
		) : undefined;

	return {
		hidden,
		mobile,
		desktop
	};
}

export default function DocItemLayout({ children }: Props): ReactNode {
	const docTOC = useDocTOC();
	const { metadata } = useDoc();

	return (
		<div className="row">
			<div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
				<ContentVisibility metadata={metadata} />
				<DocVersionBanner />
				<div className={styles.docItemContainer}>
					<article>
						<DocBreadcrumbs />
						<DocVersionBadge />
						{docTOC.mobile}
						<DocItemContent>{children}</DocItemContent>
						<DocItemFooter />
					</article>
					<DocItemPaginator />
				</div>
			</div>
			{docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
		</div>
	);
}
