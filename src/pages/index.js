import {
    initialCards,
    mestoContainer,
    mestoTemplate,
    popupOpenButton,
    popupOpenMestoButton,
    initialValid
} from "../utils/constants.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import PopupWithImage from "../components/PopupWithImage";
import {Card} from "../components/Card";

export const userInfo = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__description'});
const cardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item, `${"." + mestoTemplate.classList.value}`);
            cardsList.addItem(cardElement);
        }
    },
    '.elements-cards');
cardsList.renderItems();
const popupProfile = new PopupWithForm('.popup_type_profile', (values) => {
    userInfo.setUserInfo({name: values['popup-name'], info: values['popup-job']}); // A
});
const popupMesto = new PopupWithForm('.popup_type_mesto', (values) => {
    const name = values['mesto-name'];
    const link = values['mesto-image-link'];
    const cardElement = createCard({name, link}, `${"." + mestoTemplate.classList.value}`);
    cardsList.addItem(cardElement);
    addCardFormValidator.reset();
});

const popupMestoImage = new PopupWithImage('.popup_type_image');
popupOpenButton.addEventListener('click',  () => {
    popupProfile.popup.querySelector('.popup__input_type_name').value = userInfo.getUserInfo().name;
    popupProfile.popup.querySelector('.popup__input_type_job').value = userInfo.getUserInfo().info;
    popupProfile.open();
    formValidatorProfile.reset();
});

popupOpenMestoButton.addEventListener('click', () => {
    popupMesto.open();
    addCardFormValidator.reset();
});

//-----------------------Валидация-----------------------------------
export const popupContainer = popupProfile.popup.querySelector('.popup__form');
export const popupContainerElem = popupMesto.popup.querySelector('.popup__form');

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















