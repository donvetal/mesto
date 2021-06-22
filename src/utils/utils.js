import {Card} from "../components/Card.js";

export function openPopup(popup) {
    popup.classList.add('popup_opened'); //добавляем к popup класс popup_opened
    //закрытия попапа по оверлею и кнопке крестик
    popup.addEventListener('click', handlePopupClose);
    //закрытие popup кнопкой ESC
    document.addEventListener('keydown', handeleEscUp);
};

export function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
};

//Функция закрытия по  ESC
export function handeleEscUp(evt) {
    if (evt.key === "Escape") {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
};

export function closePopup(popup) {
    if (!popup) return;
    popup.classList.remove('popup_opened'); //удаляем у popup класс popup_opened
    document.removeEventListener('keydown', handeleEscUp);
    document.removeEventListener('click', handlePopupClose);
};

//Функционал создания карточки
export function createCard(item, selector) {
    const card = new Card(item, selector);
    const cardElement = card.generateCard();
    return cardElement;
}