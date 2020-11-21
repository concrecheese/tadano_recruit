// scrollAnimation -appear

(function () {
	const jsAppear = document.querySelectorAll('.js-appear');
	const appearOptions = {
		root: null,
		rootMargin: '0px 0px -25%',
		threshold: 0
	};
	const appearsＷhenScrolling = (entries, appearObserver) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('-active');
				appearObserver.unobserve(entry.target);
			}
		});
	};
	const appearObserver = new IntersectionObserver(
		appearsＷhenScrolling,
		appearOptions
	);
	jsAppear.forEach(appear => {
		appearObserver.observe(appear);
	});
})();
