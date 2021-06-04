//--------------------------Card-------------------------------//

/*
Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
принимает в конструктор её данные и селектор её template-элемента;
содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
содержит приватные методы для каждого обработчика;
содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
 */
import {openPopup} from "./utils/utils.js";

const popupMestoImage = document.querySelector('.popup_type_image');
const imagePopupName = document.querySelector('.popup__description');
const imagePopupFoto = document.querySelector('.popup__image');


class Card {
    constructor(data, cardSelector) {

        this._imageName = data.name;
        this._imageLink = data.link;
        this._cardSelector = cardSelector;

    }

    //метод _getTemplate, найдёт template-элемент с классом this._cardSelector(селектор шаблона),
    // извлечёт его содержимое,
    // в содержимом найдёт элемент с классом card,
    // клонирует его,
    // вернёт клонированный элемент.
    _getTemplate = () => {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return cardElement;
    };
    // метод generateCard , вставит данные из массива  initialCards в разметку и подготовит карточку к публикации в DOM.
    generateCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__name').textContent = this._imageName;
        this._element.querySelector('.card__image').src = this._imageLink;
        this._element.querySelector('.card__image').alt = 'фото ' + this._imageName;
        return this._element;
    };

    _handleOpenPopup = () => {

        openPopup(popupMestoImage);
        imagePopupFoto.src = this._imageLink;
        imagePopupName.textContent = this._imageName;
        imagePopupFoto.alt = 'фото ' + this._imageName;

    };

    _setEventListeners = () => {
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        // удаления карточки
        this._element.querySelector('.card__trash').addEventListener('click', (e) => {
            e.target.closest('.card').remove();

        });
        //лайк
        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('card__like_active');
        });

    };

}

export {Card};

