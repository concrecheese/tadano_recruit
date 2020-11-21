// drawer

export default function () {
  const drawerBtn = document.getElementById('js-drawerBtn');
  // const drawerNavBack = document.querySelector('.js-drawer');
  const hasDrawerActive = () => {
    document.body.classList.contains('js-drawerActive');
  };
  const ariaExpandedSwitching = () => {
    if (drawerBtn.getAttribute('aria-expanded') === 'false') {
      drawerBtn.setAttribute('aria-expanded', 'true');
    } else {
      drawerBtn.setAttribute('aria-expanded', 'false');
    }
  };
  // drawerBtn
  drawerBtn.addEventListener('click', () => {
    ariaExpandedSwitching();
    document.body.classList.toggle('js-drawerActive');
  });
  // drawerNavBack.addEventListener('click', () => {
  //   ariaExpandedSwitching();
  //   if (hasDrawerActive) {
  //     document.body.classList.remove('js-drawerActive');
  //   }
  // });
}
