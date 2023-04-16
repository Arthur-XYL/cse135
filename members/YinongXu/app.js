const navSlide = () => {
    const lines = document.querySelector('.lines');
    const navlinks = document.querySelector('.navlinks');
    lines.addEventListener('click', () => {
        navlinks.classList.toggle('navlinks-active');
    });
}
navSlide();