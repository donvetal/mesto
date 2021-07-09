import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._closeBtn = this.popup.querySelector('.popup__btn_delete-card');
        this._closeBtn.onclick = () => {
            this.onDelete && this.onDelete(this);
        };
    }


}
