import Popup from "./Popup.js";
import {addCardFormValidator, formValidatorProfile, userInfo} from "../pages";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, onFormSubmit) { // B
        super(popupSelector);
        this._onFormSubmit = onFormSubmit;
        this.inputList = this.popup.querySelectorAll('.popup__input');
        this._formValues = {};
    }

    _getInputValues() {
        this.inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListener() {
        super.setEventListener();
        this.popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._formValues = {};
        this.inputList.forEach(input => input.value = "");
        if (this.popup.classList.contains('popup_type_profile')) {
            formValidatorProfile.reset();
        } else if (this.popup.classList.contains('popup_type_mesto')) {
            addCardFormValidator.reset();
        }
    }
}