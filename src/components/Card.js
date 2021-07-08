import PopupDeleteCard from "./PopupDeleteCard";
import {api, popupDelete, userInfo} from "../pages";
import {data} from "autoprefixer";

class Card {
    constructor(data, cardSelector, handleCardClick) {
        this.data = data;
        this._imageName = data.name;
        this._imageLink = data.link;
        //добавил
        this._imageTotalLikes = data.likes;
        this._cardSelector = cardSelector;
        this._handleOpenPopup = handleCardClick;
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
        this._cardImage = this._element.querySelector('.card__image');
        //--------добавил
        this._element.querySelector('.card__like-number').textContent = this._imageTotalLikes.length;
        this._setEventListeners();
        this._element.querySelector('.card__name').textContent = this._imageName;
        this._cardImage.src = this._imageLink;
        this._cardImage.alt = 'фото ' + this._imageName;

        return this._element;
    };

    _setEventListeners = () => {
        this._cardImage.addEventListener('click', () => {
            this._handleOpenPopup({link: this._imageLink, name: this._imageName, likes: this._imageTotalLikes});
        });

        // удаления карточки
        this._element.querySelector('.card__trash').addEventListener('click', (e) => {
            popupDelete.open();
            popupDelete.onDelete = (popup) => {
                popupDelete.popup.querySelector('.popup__btn').textContent = 'Удаляем...'
                api.deleteCard(this.data._id).then(_ => {
                    e.target.closest('.card').remove();
                    popup.close()
                })
                    .finally(() => {
                        popupDelete.popup.querySelector('.popup__btn').textContent = 'Да'
                    })
            }

        });
        //лайк
        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            evt.preventDefault()

            if(!this.data.likes.some(like => like._id === userInfo.getUserInfo().id)) {
                this.data.likes.push({'_id': userInfo.getUserInfo().id})
                evt.target.classList.toggle('card__like_active');
                this._element.querySelector('.card__like-number').textContent = this.data.likes.length ;
                api.putLike(this.data._id)
                    .catch(_ => {
                        evt.target.classList.toggle('card__like_active');
                        this.data.likes = this.data.likes.filter(like => like._id != userInfo.getUserInfo().id)
                        this._element.querySelector('.card__like-number').textContent = this.data.likes.length;
                    })

            } else {
                this.data.likes = this.data.likes.filter(like => like._id != userInfo.getUserInfo().id)
                evt.target.classList.toggle('card__like_active');
                this._element.querySelector('.card__like-number').textContent = this.data.likes.length;
                api.deleteLike(this.data._id)
                    .catch(_ => {
                        evt.target.classList.toggle('card__like_active');
                        this.data.likes.push({'_id': userInfo.getUserInfo().id})
                        this._element.querySelector('.card__like-number').textContent = this.data.likes.length
                    })

            }

        });
    };
}

export {Card};