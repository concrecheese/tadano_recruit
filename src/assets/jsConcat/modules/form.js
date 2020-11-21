/* form */

// デリバリー希望ラジオにチェックを入れるとなら住所欄有効・表示
(function () {
	const delivery = document.getElementById('delivery');
	const jsDeliveryAddress = document.getElementById('js-deliveryAddress');

	// フォーム(ラジオボタン)の変更イベントを感知
	// デリバリーボタンのチェック状態を検出
	document.takeoutForm.addEventListener('change', () => {
		if (delivery.checked) {
			jsDeliveryAddress.disabled = false; // disabledを削除
		} else {
			jsDeliveryAddress.disabled = true; // disabledを付与
		}
	});
})();
