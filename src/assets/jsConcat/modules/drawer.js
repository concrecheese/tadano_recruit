/* drawer */

(function () {
	const drawerBtn = document.getElementById('js-drawerBtn');
	// const drawerNavBack = document.querySelector('.js-drawer');

	// bodyがjs-drawerActiveクラスを持っているか
	// const hasDrawerActive = () => {
	// 	document.body.classList.contains('js-drawerActive');
	// };

	// aria-expandedをfalseならtrueに・trueならfalseに
	const ariaExpandedSwitching = () => {
		if (drawerBtn.getAttribute('aria-expanded') === 'false') {
			drawerBtn.setAttribute('aria-expanded', 'true');
		} else {
			drawerBtn.setAttribute('aria-expanded', 'false');
		}
	};

	// drawerBtnのクリック処理・
	drawerBtn.addEventListener('click', () => {
		ariaExpandedSwitching(); // aria-expanded処理
		document.body.classList.toggle('js-drawerActive'); // bodyにjs-drawerActiveクラス
	});

	// drawerNavBack.addEventListener('click', () => {
	//   ariaExpandedSwitching();
	//   if (hasDrawerActive) {
	//     document.body.classList.remove('js-drawerActive');
	//   }
	// });
})();
