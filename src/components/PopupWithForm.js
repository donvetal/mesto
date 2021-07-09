import Popup from "./Popup.js";

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
        });
    }

    close() {
        super.close();
        this._formValues = {};
        this.inputList.forEach(input => input.value = "");
    }
}