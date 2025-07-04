$(document).ready(function () {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slide");

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;

        if (slideIndex > slides.length) { slideIndex = 1 }

        const effect = () => $(slides[slideIndex - 1]).fadeIn(2000).delay(2000).fadeOut();

        $.when(effect()).done(function () {
            showSlides();
        });
    }
});