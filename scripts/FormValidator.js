
/*
Создайте класс FormValidator, который настраивает валидацию полей формы:
принимает в конструктор объект настроек с селекторами и классами формы;
принимает вторым параметром элемент той формы, которая валидируется;
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет один публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создайте экземпляр класса FormValidator.
 */
class FormValidator {
    constructor(popup, config) {
        this._config = config;
        const {formSelector, inputSelector, submitButtonSelector, popupCloseSelector, ...restConfig} = config;

        this._formElement = popup.querySelector(formSelector);

        this.validate = () => {
            this._toggleButtonState();
        };

        this._hazInvalidInput = (inputList) => {
            return inputList.some(inputElement => !inputElement.validity.valid);
        };
        //find all inputs
        this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
        //find button element
        this._buttonElement = this._formElement.querySelector(submitButtonSelector);

        popup.querySelector(popupCloseSelector).addEventListener('click', () => {
            this._inputList.forEach((inputElement) => {
                this._hideInputError(this._formElement, inputElement, config);
            });
            this._buttonElement.disabled = true;
        });

        this._hideInputError = (formElement, inputElement, config) => {
            //hide error
            //finde error element
            const {inputErrorClass, errorActiveClass} = config;
            const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove(inputErrorClass);
            errorElement.classList.remove(errorActiveClass);
            errorElement.textContent = '';
        };
        this._showInputError = (formElement, inputElement, config) => {
            //show error
            const {inputErrorClass, errorActiveClass} = config;
            const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.add(inputErrorClass);
            errorElement.textContent = inputElement.validationMessage;
            errorElement.classList.add(errorActiveClass);
        };
    }

    // включает валидацию формы
    enableValidation() {
        //add listeners for all input
        //set initial button state
        this._addHandlers()
        this._toggleButtonState()
    }

    // проверяют валидность поля
    _validate(inputElement) {
        //check input is valid

        //check input is valid
        //if valid, hide error else show error
        if (inputElement.validity.valid) {
            this._hideInputError(this._formElement, inputElement, this._config);
        } else {
            this._showInputError(this._formElement, inputElement, this._config);
        }


        if (this._hazInvalidInput(this._inputList)) {
            //disable
            this._buttonElement.disabled = true;
        } else {
            //enebled
            this._buttonElement.disabled = false;
        }
    }
    // изменяют состояние кнопки сабмита
    _toggleButtonState() {
        if (this._hazInvalidInput(this._inputList) || this._inputList.every(item => !item.value.length)) {
            //disable
            this._buttonElement.disabled = true;
        } else {
            //enebled
            this._buttonElement.disabled = false;
        }
    }
    // устанавливают все обработчики
    _addHandlers() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._validate(inputElement)
            });
        });
        this._formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
    }
}

const validators = []

const enableValidation = ({popupContentSelector, ...restConfig}) => {
    //find all forms
    const popups = Array.from(document.querySelectorAll(popupContentSelector));
    popups.forEach(popup => {
        //set ivent listeners for each form
        // setEventListeners(popup, restConfig);
        const v = new FormValidator(popup, restConfig);
        v.enableValidation()
        validators.push(v);
    });
};
export {FormValidator, validators, enableValidation}