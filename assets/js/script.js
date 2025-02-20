document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-footer');
    const footerContent = document.querySelector('.footer-content');

    toggleButton.addEventListener('click', function() {
        if (footerContent.style.display === 'none') {
            footerContent.style.display = 'block';
        } else {
            footerContent.style.display = 'none';
        }
    });

    const backToTop = document.querySelector('.backToTop');
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});