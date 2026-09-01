// Scroll-reveal wiring, shared by the home page and the standalone
// section pages. Pages remount on navigation; layouts do not, so this
// must be called per page (see ADR 0005 for the reveal mechanics).

export function observeReveals(): (() => void) | undefined {
	const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

	if (!('IntersectionObserver' in window)) {
		elements.forEach((el) => el.classList.add('is-visible'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
	);

	elements.forEach((el) => observer.observe(el));

	return () => observer.disconnect();
}
