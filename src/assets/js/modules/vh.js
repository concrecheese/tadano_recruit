export default function () {
  const vh = window.innerHeight;

  document.getElementById('js-hero').style.height = vh + 'px';

  const heroSliderHight = document.getElementById('js-heroSlider').offsetHeight;
  const heroNewsHight = document.getElementById('js-heroNews').offsetHeight;
  const heroSliderShoutHight = heroSliderHight - heroNewsHight;

  document.getElementById('js-heroSlider').style.height =
    heroSliderShoutHight + 'px';
}
