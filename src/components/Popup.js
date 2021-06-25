export default class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListener();
    }

    open() {
        this.popup.classList.add('popup_opened'); //добавляем к popup класс popup_opened
        document.addEventListener('keydown', this._handleEscClose); //закрытие popup кнопкой ESC
    }

    close() {
        this.popup.classList.remove('popup_opened'); //удаляем у popup класс popup_opened
        document.removeEventListener('keydown', this._handleEscClose);

    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            if (this.popup) {
                this.close();
            }
        }
    }

    _handlePopupClose(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            if (this.popup) {
                this.close();
            }
        }
    };

    setEventListener() {
        //закрытия попапа по оверлею и кнопке крестик
        this.popup.addEventListener('click', this._handlePopupClose.bind(this));
    }
}