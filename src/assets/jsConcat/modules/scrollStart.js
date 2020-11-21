// scrollAnimation -start

(function () {
	//
	const jsStart = document.querySelectorAll('.js-start');

	//
	const startOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0
	};

	//
	const startByScrolling = (entries, startObserver) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('-active');
			} else {
				entry.target.classList.remove('-active');
			}
		});
	};

	// IntersectionObserverの実行
	const startObserver = new IntersectionObserver(
		startByScrolling,
		startOptions
	);

	jsStart.forEach(start => {
		startObserver.observe(start);
	});
})();
