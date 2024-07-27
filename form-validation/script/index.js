function Validator (options) {
    var formElement = document.querySelector(options.form);
    var selectorValue = {};

    function getParent (element, parent) {
        while (element.parentElement) {
            if (element.parentElement.matches(parent)) {
                return element.parentElement;
            }
            else {
                element = element.parentElement;
            }
        }
    }

    function addWarning (messageError, inputElement) {
        var spanElement = getParent(inputElement, options.formGroup).querySelector(options.errorMessage);
        spanElement.innerText = messageError;
        getParent(inputElement, options.formGroup).classList.add(options.editError);
    }

    function removeWarning (inputElement) {
        var spanElement = getParent(inputElement, options.formGroup).querySelector(options.errorMessage);
        spanElement.innerText = '';
        getParent(inputElement, options.formGroup).classList.remove(options.editError);
    }

    if (formElement) {
        options.rules.forEach (function (rule) {
            if (Array.isArray(selectorValue[rule.selector])) {
                selectorValue[rule.selector].push(rule.test);
            }
            else {
                selectorValue[rule.selector] = [rule.test];
            }
        });

        options.rules.forEach (function (rule) {
            var inputElement = formElement.querySelector(rule.selector);

            
            inputElement.onblur = function () {
                selectorValue[rule.selector].forEach (function (test) {
                    if (!getParent(inputElement, options.formGroup).classList.contains(options.editError)) {
                        var messageError = test(inputElement.value);
                        if (messageError) {
                            addWarning(messageError, inputElement);
                        }
                    }
                });
            }

            inputElement.oninput = function () {
                if (getParent(inputElement, options.formGroup).classList.contains(options.editError)) {
                    removeWarning(inputElement);
                }
            }
        });
    }

    formElement.onsubmit = function (e) {
        e.preventDefault();

        var isValid = true;
        options.rules.forEach (function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            selectorValue[rule.selector].forEach (function (test) {
                if (!getParent(inputElement, options.formGroup).classList.contains(options.editError)) {
                    var messageError = test(inputElement.value);
                    if (messageError) {
                        addWarning(messageError, inputElement);
                        isValid = false;
                    }
                }
                else {
                    isValid = false;
                }
            });
        });

        var informationUser = {};
        if (isValid) {
            console.log('Lấy dữ liệu thành công');
            var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
            options.onSubmit = [...enableInputs].reduce (function (value, input) {
                value[input.name] = input.value;
                return value;
            }, {});

            console.log(options.onSubmit);
        }
        else {
            console.log('Lấy dữ liệu thất bại');
            isValid = true;
        }
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Trường này là bắt buộc.';
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email.';
        }
    }
}

Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
            return regex.test(value) ? undefined : message || 'Mật khẩu tối thiểu 8 ký tự, phải có ít nhất một chữ in hoa, in thường, chữ số và ký tự đặc biệt.';
        }
    }
}

Validator.isPasswordConfirm = function (passwordConfirm, getPassword, message) {
    return {
        selector: passwordConfirm,
        test: function (value) {
            var currentPassword = getPassword();
            return value == currentPassword.value ? undefined : message || 'Xác thực mật khẩu không chính xác.'
        }
    }
}