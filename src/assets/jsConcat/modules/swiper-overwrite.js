// swiperの個別は一番外側のswiper-container
// 複数のswiperが混在する場合・かつページネーションをコンテナの外側に出してる場合
// ページネーションもpaginationのところのelで個別クラスの付いたページネーションを指定しなければならない。注意。
//

/* crane_swiper */
const craneSlide = new Swiper('.crane_swiper', {
	speed: 2000,
	loop: true,
	effect: 'slide',

	spaceBetween: 0,

	slidesPerView: 2,
	centeredSlides: false, // false 左寄せ true 中央寄せ

	// 900以上
	breakpoints: {
		600: {
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
		el: '.swiper-pagination',
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

/* product_swiper */

// media
const productSlide = new Swiper('.product_mediaSwiper', {
	speed: 600,
	loop: false,
	effect: 'slide',
	spaceBetween: 24,

	slidesPerView: 2,
	centeredSlides: true, // false 左寄せ true 中央寄せ

	// 900以上
	breakpoints: {
		1000: {
			slidesPerView: 4,
			spaceBetween: 32
		}
	},

	// navigation: {
	// 	nextEl: '.swiper-button-next',
	// 	prevEl: '.swiper-button-prev'
	// },

	pagination: {
		swiper: productThumbs
		// type: 'bullets',
		// clickable: true // true クリック可能
		// progressbarOpposite: true
	},

	// product_bullets
	pagination: {
		el: '.product_bullets',
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

// info
const productThumbs = new Swiper('.product_infoSwiper', {
	speed: 600,
	loop: false,
	effect: 'fade',

	// spaceBetween: 20,

	slidesPerView: 1,
	centeredSlides: true // false 左寄せ true 中央寄せ

	// pagination: {
	// 	type: 'bullets',
	// 	clickable: true // true クリック可能
	// 	// progressbarOpposite: true
	// }
});

// 連動させる設定
productSlide.controller.control = productThumbs;
productThumbs.controller.control = productSlide;
