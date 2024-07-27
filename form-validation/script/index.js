function Validator(options) {
    var formElement = document.querySelector(options.form);
    var selectorRules = {};
    options.rules.forEach(rule => {
        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        }
        else {
            selectorRules[rule.selector] = [rule.test];
        }
    });
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
            
            var isValid = true;
            for (var item in selectorRules) {
                var inputElement = formElement.querySelector(item);
                for (var test of selectorRules[item]) {
                    var messageError = test(inputElement.value);
                    if (messageError) {
                        var spanElement = inputElement.parentElement.querySelector(options.spanForm);
                        var groupElement = inputElement.parentElement;
                        addClassEditError(spanElement, groupElement, messageError);
                        isValid = false;
                    }
                    if (!isValid) break;
                }
            }
    
            var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
            if (isValid == true) {
                options.onSubmit = [...enableInputs].reduce(function (value, input) {
                    value[input.name] = input.value;
                    return value;
                }, {}); 
                console.log(options.onSubmit);
            }
            else {
                // console.log('Dữ liệu nhập sai');
            }
        }

        function addClassEditError (spanElement, groupElement, messageError) {
            spanElement.innerHTML = messageError;
            groupElement.classList.add(options.classEditError);
        }

        function removeClassEditError (spanElement, groupElement, messageError) {
            spanElement.innerHTML = '';
            groupElement.classList.remove(options.classEditError);
        }

        options.rules.forEach(rule => {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = document.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    var messageError;
                    for (var item of selectorRules[rule.selector]) {
                        messageError = item(inputElement.value);
                        if (messageError) {
                            break;
                        }
                    }

                    var spanElement = inputElement.parentElement.querySelector(options.spanForm);
                    var groupElement = inputElement.parentElement;

                    if (messageError) {
                        addClassEditError(spanElement, groupElement, messageError);
                        inputElement.oninput = function () {
                            removeClassEditError(spanElement, groupElement, messageError);
                        }
                    }
                    else {
                        removeClassEditError(spanElement, groupElement, messageError);
                    }
                    
                }
            }

        });
    }
}

//Define method Validator
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : (message || 'Phải nhập trường này.');
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : (message || 'Trường này phải là email.');
        }
    }
}

Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
            return regex.test(value) ? undefined : (message || 'Password ít nhất 8 ký tự, phải có chữ in thường, in hoa, số và ký tự đặc biệt.');
        }
    }
}

Validator.isPasswordConfirm = function (passwrodConfirm, getPassword, message) {
    return {
        selector: passwrodConfirm,
        test: function (value) {
            var currentPassword = getPassword();
            return value == currentPassword.value ? undefined : (message || 'Mật khẩu không khớp.');
        }
    }
}