function Validator (options) {
    var formElement = document.querySelector(options.form);

    options.rules.forEach(rule => {
        rule.selector.forEach(item => {
            var inputElement = formElement.querySelector(item);
            var spanElement = inputElement.parentElement.querySelector(options.errorSpan);
    
            if (inputElement) {
                function Validator () {
                    var messageError = rule.test(inputElement.value);
                    if (messageError) {
                        inputElement.parentElement.classList.add(options.classInvalid);
                        spanElement.innerText = messageError;
                    }
                    else {
                        inputElement.parentElement.classList.remove(options.classInvalid);
                        spanElement.innerText = '';
                    }
                }

                inputElement.onblur = function () {
                    Validator();
                }
                inputElement.oninput = function () {
                    inputElement.parentElement.classList.remove(options.classInvalid);
                    spanElement.innerText = '';
                }
            }
        });
    });
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này.'
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    }
}

Validator.isPassword = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return (value.length >= 8) ? undefined : 'Mật khẩu tối thiểu 8 ký tự.'
        }
    }
}

Validator.isPasswordRepeat = function (selector, form, password) {
    return {
        selector: selector,
        test: function (value) {
            var formElement = document.querySelector(form);
            var passwordElement = formElement.querySelector(password);
            var curPassword = passwordElement.value;

            return (curPassword == value) ? undefined : 'Mật khẩu không khớp';
        }
    }
}