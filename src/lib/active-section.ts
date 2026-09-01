// Active-section tracking for nav highlighting, shared by the Header.
// The Header lives in the layout and does not remount on navigation, so
// callers must re-run this whenever the route changes. The observer
// watches the section ids that exist on the current page; pages without
// them (blog, standalone section routes) simply report none.

export const SECTION_IDS = ['about', 'projects', 'contact'] as const;

export function observeActiveSection(
	onChange: (sectionId: string) => void
): (() => void) | undefined {
	if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) onChange(entry.target.id);
			}
		},
		{ rootMargin: '-20% 0px -60% 0px', threshold: 0 }
	);

	for (const id of SECTION_IDS) {
		const el = document.getElementById(id);
		if (el) observer.observe(el);
	}

	return () => observer.disconnect();
}
