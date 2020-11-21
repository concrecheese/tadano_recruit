/* VH */

// l-hero(js-hero)の高さをアドレスバーを除いた100vhに。
// DOMContentLoadedは画像とかは待たない。DOMだけ

window.addEventListener('DOMContentLoaded', function () {
	const vh = window.innerHeight;
	document.getElementById('js-hero').style.height = vh + 'px';

	const heroBoxHight = document.getElementById('js-heroBox').offsetHeight;
	const heroNewsHight = document.getElementById('js-heroNews').offsetHeight;
	const heroBoxShoutHight = heroBoxHight - heroNewsHight;

	document.getElementById('js-heroBox').style.height = heroBoxShoutHight + 'px';
});
