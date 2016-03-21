var menuToggle  = document.querySelector('.main-nav__toggle'),
    menuList    = document.querySelector('.main-nav__items');
    menuToggle.addEventListener('click', function(event) {
    event.preventDefault();
    if (menuList.classList.contains('main-nav__items--opened')) {
        menuList.classList.remove('main-nav__items--opened')
        menuToggle.classList.remove('main-nav__toggle--opened')
    }
    else {
        menuList.classList.add('main-nav__items--opened');
        menuToggle.classList.add('main-nav__toggle--opened');
    }
});
