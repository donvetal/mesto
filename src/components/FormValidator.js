export default class FormValidator {

    constructor(dataInit, formElement) {
        this._inputSelector = dataInit.inputSelector;
        this._submitButtonSelector = dataInit.submitButtonSelector;
        this._inactiveButtonClass = dataInit.inactiveButtonClass;
        this._inputErrorClass = dataInit.inputErrorClass;
        this._errorClass = dataInit.errorClass;
        this._formElement = formElement;
        this._isEnabled = false;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._setEventListeners();
    }


    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!this._isEnabled) {
            return;
        }
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    };

    _toggleButtonState() {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput()) {
            // сделай кнопку неактивной
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    _setEventListeners() {
        // цикл по input с установкой события на ввод
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                // Вызовем toggleButtonState и передадим ей массив полей и кнопку
                this._toggleButtonState();
            });
        });
    };

    reset() {
        // скрыть подсветку прежнмх ошибок
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        // Найдём в текущей форме кнопку отправки
        this._toggleButtonState();
    }

    enableValidation() {
        this._isEnabled = true;
    };

}




