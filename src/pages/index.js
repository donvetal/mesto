import {
    formElementMesto,
    formElementProfile,
    imageInputMesto,
    initialCards,
    jobInput,
    mestoContainer,
    mestoContainerSelector,
    mestoTemplate,
    nameInput,
    nameInputMesto,
    popupCloseMestoButton,
    popupContainer,
    popupContainerElem,
    popupMesto,
    popupOpenButton,
    popupOpenMestoButton,
    popupProfile,
    profileDescription,
    profileTitle
} from "../utils/constants.js";
import "./index.css";
// import {Card} from "../components/Card.js"; перенес в utils .js
import {FormValidator} from "../components/FormValidator.js";
import {closePopup, createCard, openPopup} from "../utils/utils.js";
import Section from "../components/Section.js";

//перенес в costants
// const popupOpenButton = document.querySelector('.profile__button');
// const popupProfile = document.querySelector('.popup_type_profile');
// const formElementProfile = document.querySelector('.popup__form_type_profile');
// const nameInput = formElementProfile.querySelector('.popup__input_type_name');
// const jobInput = formElementProfile.querySelector('.popup__input_type_job');
//
// const profileTitle = document.querySelector('.profile__name');
// const profileDescription = document.querySelector('.profile__description');

function openPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    formValidatorProfile.preparationFormBeforeOpen();
}


popupOpenButton.addEventListener('click', openPopupProfile);


function submitEditProfileForm(evt) {
    evt.preventDefault();
    closePopup(popupProfile);
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

}

formElementProfile.addEventListener('submit', submitEditProfileForm);


// //------------------------------- Popup Mesto----------------------------------//

//----------------------------перенес  в  constants.js---------------------------//
// const popupOpenMestoButton = document.querySelector('.profile__add-button');
// const popupMesto = document.querySelector('.popup_type_mesto');
//
// const popupCloseMestoButton = document.querySelector('.popup__close_type_mesto');

function handleOpenPopupMesto() {
    openPopup(popupMesto);
    //очистка полей формы место
    popupMesto.querySelector('.popup__form_type_mesto').reset();
    addCardFormValidator.preparationFormBeforeOpen();
}

function handleClosePopupAddCard() {
    closePopup(popupMesto);

}

popupOpenMestoButton.addEventListener('click', handleOpenPopupMesto);

popupCloseMestoButton.addEventListener('click', handleClosePopupAddCard);

//-------------------------перенес в costants.js---------------------------//
// const formElementMesto = document.querySelector('.popup__form_type_mesto');
// const nameInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-name');
// const imageInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-image-link');

//--------------------------------------Foto popup перенес в------------------------------------------//
// const mestoContainer = document.querySelector('.elements-cards');
// const mestoTemplate = document.querySelector('.mesto-template');

//----------------------------перенес в utils.js------------------------------
//Функционал создания карточки
// function createCard(item, selector) {
//     const card = new Card(item, selector);
//     const cardElement = card.generateCard();
//     return cardElement;
// }

function handleFormSubmitMesto(evt) {
    evt.preventDefault();
    handleClosePopupAddCard();
    const name = nameInputMesto.value;
    const link = imageInputMesto.value;

    const cardElement = createCard({name, link}, `${"." + mestoTemplate.classList.value}`);

    mestoContainer.prepend(cardElement);

    formElementMesto.reset();
}


formElementMesto.addEventListener('submit', handleFormSubmitMesto);

//публикую карточки. Обхожу массив initialCards и для каждого его элемента:
// создайтю экземпляр класса Card,
// подготавливаю карточку к публикации и возвращаю результат,
// публикую карточку в '.elements-cards' DOM-дерева.
//--------передал в Section.js------------------------
// initialCards.forEach((item) => {
//     const cardElement = createCard(item, `${"." + mestoTemplate.classList.value}`);
//     mestoContainer.append(cardElement);
// });
const cardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item, `${"." + mestoTemplate.classList.value}`);
            cardsList.addItem(cardElement);
        }
    },
    mestoContainerSelector);
cardsList.renderItems();
//-----------------------Валидация-----------------------------------
// const popupContainer = popupProfile.querySelector('.popup__form');
// const popupContainerElem = popupMesto.querySelector('.popup__form');
const initialValid =
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__btn',
        inactiveButtonClass: 'popup__btn_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active',
    };

const formValidatorProfile = new FormValidator(initialValid, popupContainer);
formValidatorProfile.enableValidation();

const addCardFormValidator = new FormValidator(initialValid, popupContainerElem);
addCardFormValidator.enableValidation();















