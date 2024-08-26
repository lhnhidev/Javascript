var btnLeft = document.querySelector('#left');
var btnRigth = document.querySelector('#right');
var slider = document.querySelector('#slider');
var img = document.querySelectorAll('.slider-item');
var myLoca = document.querySelectorAll('#location .slider-link');

var index = 0;

function changeSlide() {
    --index;
    if (index == img.length * -1) {
        index = 0;
    }
    sliderActive(index);
}

var autoSlider = setInterval(changeSlide, 3000);

function sliderActive(index) {
    document.querySelector('#slider').style.left = `${index * 450}px`; 
}

btnLeft.addEventListener('click', () => {
    index++;
    if (index == 1) {
        index = (img.length - 1) * -1;
    }
    clearInterval(autoSlider);
    autoSlider = setInterval(changeSlide, 3000);
    sliderActive(index);
});

btnRigth.addEventListener('click', () => {
    index--;
    if (index == img.length * -1) {
        index = 0;
    }
    clearInterval(autoSlider);
    autoSlider = setInterval(changeSlide, 3000);
    sliderActive(index);
});

[...myLoca].forEach((item, idx) => {
    item.addEventListener('click', () => {
        clearInterval(autoSlider);
        autoSlider = setInterval(changeSlide, 3000);
        sliderActive(-idx);
    });
});
