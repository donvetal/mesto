import {
    initialCards,
    mestoContainer,
    mestoTemplate,
    popupOpenButton,
    popupOpenMestoButton,
} from "../utils/constants.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import PopupWithImage from "../components/PopupWithImage";
import {Card} from "../components/Card";

const userInfo = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__description'});
const popupProfile = new PopupWithForm('.popup_type_profile', (values) => {
    userInfo.setUserInfo({name: values['popup-name'], info: values['popup-job']}); // A
});
const popupMesto = new PopupWithForm('.popup_type_mesto', (values) => {
    const name = values['mesto-name'];
    const link = values['mesto-image-link'];
    const cardElement = createCard({name, link}, `${"." + mestoTemplate.classList.value}`);
    mestoContainer.prepend(cardElement);
});
const popupMestoImage = new PopupWithImage('.popup_type_image');
popupOpenButton.addEventListener('click', popupProfile.open.bind(popupProfile));

popupOpenMestoButton.addEventListener('click', popupMesto.open.bind(popupMesto));

const cardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item, `${"." + mestoTemplate.classList.value}`);
            cardsList.addItem(cardElement);
        }
    },
    '.elements-cards');
cardsList.renderItems();
//-----------------------Валидация-----------------------------------
const popupContainer = popupProfile.popup.querySelector('.popup__form');
const popupContainerElem = popupMesto.popup.querySelector('.popup__form');

const initialValid =
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__btn',
        inactiveButtonClass: 'popup__btn_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active',
    };

export const formValidatorProfile = new FormValidator(initialValid, popupContainer);
formValidatorProfile.enableValidation();

export const addCardFormValidator = new FormValidator(initialValid, popupContainerElem);
addCardFormValidator.enableValidation();

function createCard(item, selector) {
    const card = new Card(item, selector, ({link, name}) => {
        popupMestoImage.open({link, name});
    });
    const cardElement = card.generateCard();
    return cardElement;
}















