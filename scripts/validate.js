const hideInputError = (formElement, inputElement) => {
//hide error
    //finde error element
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};
const showInputError = (formElement, inputElement) => {
//show error
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('popup__input-error_active');
};

const checkInputValidity = (formElement, inputElement) => {
    //check input is valid
    //if valid, hide error else show error
    console.log(inputElement.validity.valid);
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
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
const setEventListeners = (formElement) => {
//prevent page reload on form submit
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    //find all inputs
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    //find button element
    const buttonElement = formElement.querySelector('.popup__btn');
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            //check input is valid
            checkInputValidity(formElement, inputElement);
            toggleButtonState(buttonElement, inputList);
        });
    });
    //add listeners for all input
    //set initial button state
    toggleButtonState(buttonElement, inputList);
};
const enableValidation = (formElement) => {
    //find all forms
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(formElement => {
        //set ivet listeners for each form
        setEventListeners(formElement);
    });
};