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
    console.log(inputElement.validity.valid);
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
const setEventListeners = (formElement, config) => {
//prevent page reload on form submit
    const {inputSelector, submitButtonSelector, ...restConfig} = config;
    formElement.addEventListener('submit', (evt) => {
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
    //add listeners for all input
    //set initial button state
    toggleButtonState(buttonElement, inputList);
};

const enableValidation = ({formSelector, ...restConfig}) => {
    //find all forms
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        //set ivent listeners for each form
        setEventListeners(formElement, restConfig);
    });
};
