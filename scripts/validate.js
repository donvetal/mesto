const hideInputError = (formElement, inputElement, config) => {
//hide error
    //finde error element
    const {inputErrorClass, errorActiveClass} = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorActiveClass);
    errorElement.textContent = '';
};
const showInputError = (formElement, inputElement, config) => {
//show error
    const {inputErrorClass, errorActiveClass} = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorActiveClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
    //check input is valid
    //if valid, hide error else show error
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    }
};
const hazInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};
const toggleButtonState = (buttonElement, inputList) => {
    //if form valid button enebled else  disable
    if (hazInvalidInput(inputList)) {
        //disable
        buttonElement.disabled = true;
    } else {
        //enebled
        buttonElement.disabled = false;
    }

};

const validate = (popup, inputSelector, submitButtonSelector) => {
    const inputList = Array.from(popup.querySelectorAll(inputSelector));
    const buttonElement = popup.querySelector(submitButtonSelector);
    toggleButtonState(buttonElement, inputList);
};

const setEventListeners = (popup, config) => {
//prevent page reload on form submit
    const {formSelector, inputSelector, submitButtonSelector, popupCloseSelector, ...restConfig} = config;
    const formElement = popup.querySelector(formSelector);
    formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
    });
    //find all inputs
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    //find button element
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            //check input is valid
            checkInputValidity(formElement, inputElement, restConfig);
            toggleButtonState(buttonElement, inputList);
        });
    });
    const popupClose = popup.querySelector(popupCloseSelector);
    popupClose.addEventListener('click', () => {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, config);
        });
        buttonElement.disabled = true;
    });
    //add listeners for all input
    //set initial button state

    toggleButtonState(buttonElement, inputList);
};

const enableValidation = ({popupContentSelector, ...restConfig}) => {
    //find all forms
    const popups = Array.from(document.querySelectorAll(popupContentSelector));
    popups.forEach(popup => {
        //set ivent listeners for each form
        setEventListeners(popup, restConfig);
    });
};
