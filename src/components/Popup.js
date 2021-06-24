export default class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this.setEventListener();
    }

    open() {
        this.popup.classList.add('popup_opened'); //добавляем к popup класс popup_opened
    }

    close() {
        this.popup.classList.remove('popup_opened'); //удаляем у popup класс popup_opened
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handlePopupClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            const popupActive = document.querySelector('.popup_opened');
            if (popupActive) {
                this.close();
            }
        }
    }

    _handlePopupClose(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            const popupActive = document.querySelector('.popup_opened');
            if (popupActive) {
                this.close();
            }
        }
    };

    setEventListener() {
        //закрытие popup кнопкой ESC
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        //закрытия попапа по оверлею и кнопке крестик
        this.popup.addEventListener('click', this._handlePopupClose.bind(this));
    }
}