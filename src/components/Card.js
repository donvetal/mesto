class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._imageName = data.name;
        this._imageLink = data.link;
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
        this._setEventListeners();
        this._element.querySelector('.card__name').textContent = this._imageName;
        this._cardImage.src = this._imageLink;
        this._cardImage.alt = 'фото ' + this._imageName;
        return this._element;
    };

    _setEventListeners = () => {
        this._cardImage.addEventListener('click', () => {
            this._handleOpenPopup({link: this._imageLink, name: this._imageName});
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