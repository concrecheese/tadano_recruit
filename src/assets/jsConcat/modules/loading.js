/* loading */

// loadは画像も全部読み込み終わったら実行。

window.addEventListener('DOMContentLoaded', function () {
	const jsLoading = document.getElementById('js-loading');
	const addLoaded = () => jsLoading.classList.add('-loaded');
	addLoaded();
	setTimeout(addLoaded, 5000);
});
