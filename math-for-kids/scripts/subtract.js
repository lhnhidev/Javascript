var number1 = document.getElementById('number1');
var number2 = document.getElementById('number2');
var number3 = 0;
var operator = document.getElementById('operator');

var ans1 = document.getElementById('answer1');
var ans2 = document.getElementById('answer2');
var ans3 = document.getElementById('answer3');
var ans4 = document.getElementById('answer4');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function assignWrongAns(a, b, c, d) {
    let wrongAns = getRandomInt(-18, 19);
    while (wrongAns == a || wrongAns == b || wrongAns == c || wrongAns == d) {
        wrongAns = getRandomInt(-18, 19);
    }
    return wrongAns;
}

function createAsking() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    
    number1.innerHTML = num1;
    number2.innerHTML = num2;

    number3 = eval(num1 + operator.innerText + num2);

    ans1.innerHTML = assignWrongAns(-999, -999, -999, number3);
    ans2.innerHTML = assignWrongAns(ans1.innerHTML, -999, -999, number3);
    ans3.innerHTML = assignWrongAns(ans1.innerHTML, ans2.innerHTML, -999, number3);
    ans4.innerHTML = assignWrongAns(ans1.innerHTML, ans2.innerHTML, ans3.innerHTML, number3);

    var ran = Math.random() * 10;
    if (ran < 2.5) {
        ans1.innerHTML = number3;
    }
    else if (ran < 5) {
        ans2.innerHTML = number3;
    }
    else if (ran < 7.5) {
        ans3.innerHTML = number3;
    }
    else {
        ans4.innerHTML = number3;
    }
}

createAsking();

var chooseAnswer = document.getElementsByClassName('content__answer-item');

[...chooseAnswer].forEach(item => {
    item.addEventListener('click', () => {
        if (item.innerHTML == number3) {
            // console.log('helelf');
            let randAudio = getRandomInt(1, 4);
            var tingTong;
            switch (randAudio) {
                case 1:
                    tingTong = new Audio('../assets/audio/this-is-my-son.mp3');
                    tingTong.play();
                    break;
                case 2:
                    tingTong = new Audio('../assets/audio/mark10.mp3');
                    tingTong.play();
                    break;
                case 3:
                    tingTong = new Audio('../assets/audio/ghe-chua.mp3');
                    tingTong.play();
                    break;
            }
            setTimeout(function() {
                createAsking();
            }, 300);
        }
        else {
            let randAudio = getRandomInt(1, 4);
            var fail;
            switch (randAudio) {
                case 1:
                    fail = new Audio('../assets/audio/stubip.mp3');
                    fail.play();
                    break;
                case 2:
                    fail = new Audio('../assets/audio/doitruy.mp3');
                    fail.play();
                    break;
                case 3:
                    fail = new Audio('../assets/audio/saybye-daddy.mp4');
                    fail.play();
                    break;
            }
        }
    });
});