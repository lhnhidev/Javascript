var keoUserImg = './assets/img/bantay_0003_trai-keo.jpg';
var baoUserImg = './assets/img/bantay_0004_trai-bao.jpg';
var buaUserImg = './assets/img/bantay_0005_trai-bua.jpg';

var keoBotImg = './assets/img/bantay_0002_phai-keo.jpg';
var baoBotImg = './assets/img/bantay_0000_phai-bao.jpg';
var buaBotImg = './assets/img/bantay_0001_phai-bua.jpg';

var user = document.querySelectorAll('#user button');
var choiceUser;

[...user].forEach ((choiceElement) => {
    choiceElement.addEventListener('click', () => {
        switch (choiceElement.innerHTML) {
            case 'Kéo':
                document.querySelector('#userImage').src = keoUserImg;
                choiceUser = 1;
                break;
            case 'Búa':
                document.querySelector('#userImage').src = buaUserImg;
                choiceUser = 2;
                break;
            case 'Bao':
                document.querySelector('#userImage').src = baoUserImg;
                choiceUser = 3;
                break;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        var choiceBot = getRandomInt(1, 3);
        var winner;

        if (Math.abs(choiceUser - choiceBot) == 1) {
            if (choiceUser > choiceBot) {
                winner = 'You won!';
            }
            else if (choiceBot > choiceUser) {
                winner = 'Bot won!';
            }
        }
        else if (Math.abs(choiceUser - choiceBot) == 2) {
            if (choiceUser > choiceBot) {
                winner = 'Bot won!';
            }
            else if (choiceBot > choiceUser) {
                winner = 'You won!';
            }
        }
        else {
            winner = '~ Draw! ~';
        }

        function theButtonBotChoice (button) {
            var selection = document.querySelector(button).parentElement.querySelectorAll('button');
            [...selection].forEach(item => {
                item.classList.remove('choice');
            });

            document.querySelector(button).classList.add('choice');
        }

        if (choiceBot == 1) {
            document.querySelector('#botImage').src = keoBotImg;
            theButtonBotChoice('#keoBot');
        }
        else if (choiceBot == 2) {
            document.querySelector('#botImage').src = buaBotImg;
            theButtonBotChoice('#buaBot');
        }
        else {
            document.querySelector('#botImage').src = baoBotImg;
            theButtonBotChoice('#baoBot');
        }

        var resultElement = document.querySelector('#result');
        resultElement.innerHTML = winner;
    });
});

// console.log(choice);