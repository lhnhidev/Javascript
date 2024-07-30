var addButton = document.querySelector('#addButton');
var task = document.querySelector('#task');

var createdElement = 0;
var completedElement = 0;

addButton.addEventListener('click', () => task.style.display = 'block');

var taskFrom = document.querySelector('#taskFrom');

function watching () {
    var time = new Date;
    var arrayTime = time.toString().split(' ', 3);

    function format (theClock) {
        return theClock < 10 ? ('0' + theClock) : theClock;
    }

    var hour = format(time.getHours());
    var minu = format(time.getMinutes());
    var second = format(time.getSeconds());

    var clock =`${hour}:${minu}:${second}`;

    document.querySelector('#day').innerHTML = arrayTime[0] + ',';
    document.querySelector('#date').innerHTML = arrayTime[2];
    document.querySelector('#month').innerHTML = arrayTime[1];

    document.querySelector('#time').innerHTML = clock;
}

watching();

setInterval (() => {
    watching();
}, 1000);

// console.log(day, date, month);

taskFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    var list = document.querySelector('#list');
    var taskContent = document.querySelector('#taskContent').value;

    if (taskContent != '') {
        document.querySelector('#taskContent').value = '';
        var item = `<div class="todo__item"><p class="todo__content" id="content">${taskContent}</p><div class="todo__remove" id="removeButton"><i class="fa-solid fa-trash"></i></div></div>`;
        list.innerHTML += item;
        ++createdElement;
        document.querySelector('#createdNumber').innerHTML = (createdElement < 10) ? ('0' + createdElement) : createdElement;
    }

    var buttonRemove = document.querySelectorAll('#removeButton');

    [...buttonRemove].forEach((button) => {
        button.addEventListener('click', () => {
            var item = button.parentElement;
            list.removeChild(item);
            ++completedElement;
            --createdElement;
            document.querySelector('#completedNumber').innerHTML = (completedElement < 10) ? ('0' + completedElement) : completedElement;
            document.querySelector('#createdNumber').innerHTML = (createdElement < 10) ? ('0' + createdElement) : createdElement;
        });
    });
    
    task.style.display = 'none';
});