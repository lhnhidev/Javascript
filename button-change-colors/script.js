var button = document.querySelector("#button");
var body = document.querySelector("body");
var color = ["red", "orange", "yellow", "green", "purple", "brown"];

var index = 0;

button.addEventListener('click', () => {
    if (index == color.length) {
        index = 0;
    }
    body.style.backgroundColor = color[index];
    index++;
});