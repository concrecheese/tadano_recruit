// swiper

// swiper6.0全部
import Swiper from 'swiper/bundle';

// swiper6.0モジュール単位で読み込み
// import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

// Install modules モジュール単位
// Swiper.use([Navigation, Pagination, Autoplay]);

// 上書き・設定
const option01 = {
  speed: 2000,
  loop: true,
  effect: 'fade',
  // spaceBetween: 50,

  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev'
  // },

  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
    clickable: true
    // progressbarOpposite: true
  },

  autoplay: {
    delay: 4000
    // stopOnLastSlide: true,
    // disableOnInteraction: false,
    // reverseDirection: false,
    // waitForTransition: false
  }
};

// ここはリントが反応していても良い。functionにしている。
const mySwiper = () => {
  new Swiper('.swiper-container', option01);
};

export default mySwiper;
