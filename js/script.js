var menuIcon  = document.querySelector('.main-nav__icon'),
    menuItems = document.querySelector('.main-nav__items');
    /* Menu is opened without js */
    if (!(menuItems.classList.contains('main-nav__items--closed'))) {
        menuItems.classList.add('main-nav__items--closed')
        menuIcon.classList.add('main-nav__icon--closed')
    }
    menuIcon.addEventListener('click', function(event) {
    event.preventDefault();
    if (menuItems.classList.contains('main-nav__items--closed')) {
        menuItems.classList.remove('main-nav__items--closed')
        menuIcon.classList.remove('main-nav__icon--closed')
    }
    else {
        menuItems.classList.add('main-nav__items--closed');
        menuIcon.classList.add('main-nav__icon--closed');
    }
});
