// swiperの個別は一番外側のswiper-container
// 複数のswiperが混在する場合・かつページネーションをコンテナの外側に出してる場合
// ページネーションもpaginationのところのelで個別クラスの付いたページネーションを指定しなければならない。注意。
//

/* swiper01 */
const craneSlide = new Swiper('.-crane', {
	speed: 2000,
	loop: false,
	effect: 'slide',

	spaceBetween: 0,

	slidesPerView: 2,
	centeredSlides: false, // false 左寄せ true 中央寄せ

	// 900以上
	breakpoints: {
		1000: {
			// slidesPerGroup: 2,
			slidesPerView: 3,
			// spaceBetween: 0,
			centeredSlides: false
		}
	},

	// navigation: {
	//   nextEl: '.swiper-button-next',
	//   prevEl: '.swiper-button-prev'
	// },

	pagination: {
		el: '.swiper-pagination.-crane',
		type: 'bullets',
		clickable: true // true クリック可能
		// progressbarOpposite: true
	},

	autoplay: {
		delay: 6000,
		// stopOnLastSlide: true,
		disableOnInteraction: false
		// reverseDirection: false,
		// waitForTransition: false
	}
});

/* swiper02 */

// メイン
const productSlide = new Swiper('.-product', {
	speed: 600,
	loop: false,
	effect: 'slide',

	spaceBetween: 0,

	slidesPerView: 2,
	centeredSlides: true, // false 左寄せ true 中央寄せ

	// 900以上
	breakpoints: {
		1000: {
			slidesPerView: 4
		}
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

	pagination: {
		swiper: productThumbs
		// type: 'bullets',
		// clickable: true // true クリック可能
		// progressbarOpposite: true
	},

	autoplay: {
		delay: 4000,
		// stopOnLastSlide: true,
		disableOnInteraction: false
		// reverseDirection: false,
		// waitForTransition: false
	}
});

// サブ
const productThumbs = new Swiper('.-productThumbs', {
	speed: 600,
	loop: false,
	effect: 'fade',

	// spaceBetween: 20,

	slidesPerView: 1,
	centeredSlides: true, // false 左寄せ true 中央寄せ

	// 900以上
	breakpoints: {
		1000: {
			// slidesPerView: 4
		}
	}
});

// 連動させる設定
productSlide.controller.control = productThumbs;
productThumbs.controller.control = productSlide;
