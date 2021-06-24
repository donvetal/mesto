import Popup from "./Popup.js";
import {addCardFormValidator, formValidatorProfile} from "../pages";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, onFormSubmit) { // B
        super(popupSelector);
        this._onFormSubmit = onFormSubmit;
        this._inputList = this.popup.querySelectorAll('.popup__input');
        this._formValues = {};
    }

    _getInputValues() {
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListener() {
        super.setEventListener();  // C
        this.popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onFormSubmit(this._getInputValues()); // D
            this.close();
        });
    }

    close() {
        super.close();
        this._formValues = {};
        this._inputList.forEach(input => input.value = "");
        if (this.popup.classList.contains('popup_type_profile')) {
            formValidatorProfile.reset();
        } else if (this.popup.classList.contains('popup_type_mesto')) {
            addCardFormValidator.reset();
        }
    }
}