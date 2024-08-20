var slider = document.querySelector('#images');
var length = slider.querySelectorAll('.image').length;
var widthImage = 600;
var index = 1;

var handleSlideChange = setInterval(() => {
    if (index == length) {
        index = 0;
    }
    slider.style.transform = `translateX(${widthImage * -index}px)`;
    ++index;
}, 3000);

