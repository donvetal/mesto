const popupOpenButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup_type_profile');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');

const profileTitle = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


function openPopup(popup) {
    popup.classList.add('popup_opened'); //добавляем к popup класс popup_opened
    //закрытия попапа по оверлею и кнопке крестик
    popup.addEventListener('click', handlePopupClose);
    //закрытие popup кнопкой ESC
    document.addEventListener('keydown', handeleEscUp);
}

function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
}

//Функция закрытия по  ESC
function handeleEscUp(evt) {
    if (evt.key === "Escape") {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
};


function closePopup(popup) {
    popup.classList.remove('popup_opened'); //удаляем у popup класс popup_opened
    document.removeEventListener('keydown', handeleEscUp);
    document.removeEventListener('click', handlePopupClose);
}

function openPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    validate(popupProfile, '.popup__input', '.popup__btn');
}


popupOpenButton.addEventListener('click', openPopupProfile);


function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    closePopup(popupProfile);
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

}

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);


//------------------------------- Popup Mesto----------------------------------//
const popupOpenMestoButton = document.querySelector('.profile__add-button');
const popupMesto = document.querySelector('.popup_type_mesto');

const popupCloseMestoButton = document.querySelector('.popup__close_type_mesto');

function handleOpenPopupMesto() {
    openPopup(popupMesto);
    //очистка полей формы место
    popupMesto.querySelector('.popup__form_type_mesto').reset();
    validate(popupMesto, '.popup__input', '.popup__btn');
}

function hendleClosePopupMesto() {
    closePopup(popupMesto);

}

popupOpenMestoButton.addEventListener('click', handleOpenPopupMesto);

popupCloseMestoButton.addEventListener('click', hendleClosePopupMesto);


const formElementMesto = document.querySelector('.popup__form_type_mesto');
const nameInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-name');
const imageInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-image-link');


const mestoContainer = document.querySelector('.elements-cards');
const mestoTemplate = document.querySelector('.mesto-template');


function createMesto({nameMesto, imageMesto}) {
    function handleRemoveMesto(e) {
        e.target.closest('.card').remove();
    }


    const newMesto = mestoTemplate.content.querySelector('.card').cloneNode(true);
    const mestoName = newMesto.querySelector('.card__name');
    const mestoImage = newMesto.querySelector('.card__image');
    const mestoRemoveButton = newMesto.querySelector('.card__trash');
    const cardLikeButton = newMesto.querySelector('.card__like');


    //--------------------------------------Foto popup------------------------------------------//
    const popupMestoImage = document.querySelector('.popup_type_image');


    const popupCloseImageButton = document.querySelector('.popup__close_type_image');
    const imagePopupName = document.querySelector('.popup__description');
    const imagePopupFoto = document.querySelector('.popup__image');


    function openPopupImage() {
        openPopup(popupMestoImage);
        imagePopupName.textContent = mestoName.textContent;
        imagePopupFoto.src = mestoImage.src;
        imagePopupFoto.alt = 'фото ' + mestoName.textContent;
    }


    // formElementMesto.reset();

    mestoImage.addEventListener('click', openPopupImage);

    popupCloseImageButton.addEventListener('click', () => closePopup(popupMestoImage));
    //---------------------------------------------------------------------------//
    cardLikeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    });


    mestoName.textContent = nameMesto;
    mestoImage.src = imageMesto;
    mestoImage.alt = 'фото ' + mestoName.textContent;


    mestoRemoveButton.addEventListener('click', handleRemoveMesto);


    return newMesto;
}


function handleFormSubmitMesto(evt) {
    evt.preventDefault();
    hendleClosePopupMesto();
    const nameValue = nameInputMesto.value;
    const imageValue = imageInputMesto.value;
    mestoContainer.prepend(createMesto({nameMesto: nameValue, imageMesto: imageValue}));
    formElementMesto.reset();
}


formElementMesto.addEventListener('submit', handleFormSubmitMesto);
initialCards.forEach(function (element) {
    const newCard = createMesto({nameMesto: element.name, imageMesto: element.link});
    mestoContainer.append(newCard);

});

//-----------------------Валидация-----------------------------------
enableValidation({
    popupContentSelector: '.popup__content',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    popupCloseSelector: '.popup__close',
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__input-error_active',
});














