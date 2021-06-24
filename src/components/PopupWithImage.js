import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupName = this.popup.querySelector('.popup__description');
        this._imagePopupFoto = this.popup.querySelector('.popup__image');
    }

    open({link, name}) {
        super.open();
        this._imagePopupFoto.src = link;
        this._imagePopupName.textContent = name;
        this._imagePopupFoto.alt = 'фото ' + name;
    }

}