var volumn = document.querySelector("#volumn");
var img = document.querySelector("#newImage"); 

volumn.addEventListener('input', () => {
    img.style.clipPath = "polygon(0 0, " + volumn.value + "% 0, " + volumn.value + "% 100%, 0 100%";
});