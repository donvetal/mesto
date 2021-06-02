import {initialCards} from "./initial-сards.js";
import {Card} from "./Card.js";
import {enableValidation, validators} from "./FormValidator.js";

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
}

function closePopup(popup) {
    if (!popup) return;
    popup.classList.remove('popup_opened'); //удаляем у popup класс popup_opened
    document.removeEventListener('keydown', handeleEscUp);
    document.removeEventListener('click', handlePopupClose);
}

function openPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    validators[0].validate();
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
    validators[1].validate();
}

function hendleClosePopupMesto() {
    closePopup(popupMesto);

}

popupOpenMestoButton.addEventListener('click', handleOpenPopupMesto);

popupCloseMestoButton.addEventListener('click', hendleClosePopupMesto);


const formElementMesto = document.querySelector('.popup__form_type_mesto');
const nameInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-name');
const imageInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-image-link');
//
//


//--------------------------------------Foto popup------------------------------------------//
// const popupMestoImage = document.querySelector('.popup_type_image');
// const imagePopupName = document.querySelector('.popup__description');
// const imagePopupFoto = document.querySelector('.popup__image');


function handleFormSubmitMesto(evt) {
    evt.preventDefault();
    hendleClosePopupMesto();
    const name = nameInputMesto.value;
    const link = imageInputMesto.value;

    const card = new Card({name, link}, ".mesto-template");
    const cardElement = card.generateCard();
    document.querySelector('.elements-cards').prepend(cardElement);

    formElementMesto.reset();
}


formElementMesto.addEventListener('submit', handleFormSubmitMesto);

//публикую карточки. Обхожу массив initialCards и для каждого его элемента:
// создайтю экземпляр класса Card,
// подготавливаю карточку к публикации и возвращаю результат,
// публикую карточку в '.elements-cards' DOM-дерева.
initialCards.forEach((item) => {
    const card = new Card(item, ".mesto-template");
    const cardElement = card.generateCard();
    document.querySelector('.elements-cards').append(cardElement);
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















