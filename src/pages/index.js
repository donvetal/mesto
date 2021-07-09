import {initialValid, mestoTemplate, popupOpenButton, popupOpenMestoButton} from "../utils/constants.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import PopupWithImage from "../components/PopupWithImage";
import {Card} from "../components/Card";
import {Api} from "../components/Api";
import PopupDeleteCard from "../components/PopupDeleteCard";


export const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userInfoSelector: '.profile__description',
    userAvatarSelector: '.profile__avatar'
});


//добавил
export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/',
    headers: {
        authorization: '6c5c2ad0-ab62-45ad-b6d9-d0d31ad5dd6b',
        'Content-type': 'application/json'
    }
});

let cardsList;

const getListItems = () => api.listItems()
    .then(data => {
        cardsList = new Section({
                items: data,
                renderer: (data) => {
                    const cardElement = createCard(data, `${"." + mestoTemplate.classList.value}`);
                    cardsList.addItem(cardElement);
                    //удалил корзину из чужих карточек
                    if (userInfo.getUserInfo().id != data.owner._id) {
                        document.querySelector('.card__trash').remove();
                    }
                    data.likes.forEach(item => {
                        if (item._id === userInfo.getUserInfo().id) {
                            cardElement.querySelector('.card__like').classList.add('card__like_active');
                        }
                    });

                }
            },
            '.elements-cards');
        cardsList.renderItems();
    });


api.getUserInfo()
    .then(data => {
        userInfo.setUserInfo({
            id: data._id,
            name: data.name,
            info: data.about,
            avatar: data.avatar
        });

        getListItems();

    });

const popupProfile = new PopupWithForm('.popup_type_profile', (values) => {
    popupProfile.popup.querySelector('.popup__btn').textContent = 'Сохраняем...';
    api.updateUserInfo(values['popup-name'], values['popup-job'])
        .then(data => {
            userInfo.setUserInfo({
                name: data.name,
                info: data.about
            });
        })
        .finally(() => {
            popupProfile.popup.querySelector('.popup__btn').textContent = 'Сохранить';
        });
});
const popupMesto = new PopupWithForm('.popup_type_mesto', (values) => {

    function uuidv4() {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 8 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(8);
        });
    }


    const name = values['mesto-name'];
    const link = values['mesto-image-link'];
    //----------добавил
    const likes = [];
    popupMesto.popup.querySelector('.popup__btn').textContent = 'Создаем...';
    api.addNewCard(
        {
            "likes": [],
            "_id": uuidv4(),
            "name": name,
            "link": link,
            "owner": {
                ...userInfo.getUserInfo(),
                "_id": "1",
                "cohort": "cohort-25"
            },
            "createdAt": new Date().toLocaleTimeString()
        }
    ).then(_ => {
        document.querySelector('.elements-cards').innerHTML = "";
        getListItems();

    })
        .finally(() => {
            popupMesto.popup.querySelector('.popup__btn').textContent = 'Создать';
        });

});

const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', values => {
    popupUpdateAvatar.popup.querySelector('.popup__btn').textContent = 'Сохранение...';
    api.changeAvatar(values['avatar-link'])
        .then(_ => {
            const link = values['avatar-link'];
            document.querySelector('.profile__avatar').src = link;
        })
        .finally(_ => {
            popupUpdateAvatar.popup.querySelector('.popup__btn').textContent = 'Сохранить';
        });
});
document.querySelector('.container__avatar').addEventListener('click', () => {
    popupUpdateAvatar.open();
    updateAvatarValidator.reset();
});
const popupMestoImage = new PopupWithImage('.popup_type_image');
popupOpenButton.addEventListener('click', () => {
    popupProfile.popup.querySelector('.popup__input_type_name').value = userInfo.getUserInfo().name;
    popupProfile.popup.querySelector('.popup__input_type_job').value = userInfo.getUserInfo().info;
    popupProfile.open();
    formValidatorProfile.reset();
});

export const popupDelete = new PopupDeleteCard('.popup_type_delete-image');

popupOpenMestoButton.addEventListener('click', () => {
    popupMesto.open();
    addCardFormValidator.reset();
});

//-----------------------Валидация-----------------------------------
export const popupContainer = popupProfile.popup.querySelector('.popup__form');
export const popupContainerElem = popupMesto.popup.querySelector('.popup__form');
export const popupContainerAvatar = popupUpdateAvatar.popup.querySelector('.popup__form');

export const formValidatorProfile = new FormValidator(initialValid, popupContainer);
formValidatorProfile.enableValidation();

export const addCardFormValidator = new FormValidator(initialValid, popupContainerElem);
addCardFormValidator.enableValidation();

export const updateAvatarValidator = new FormValidator(initialValid, popupContainerAvatar);
updateAvatarValidator.enableValidation();

function createCard(item, selector) {
    const card = new Card(item, selector, ({link, name, likes}) => {
        popupMestoImage.open({link, name, likes});

    });
    const cardElement = card.generateCard();
    return cardElement;
}














