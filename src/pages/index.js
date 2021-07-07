import {
    initialCards,
    initialValid,
    mestoTemplate,
    options,
    popupOpenButton,
    popupOpenMestoButton
} from "../utils/constants.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import PopupWithImage from "../components/PopupWithImage";
import {Card} from "../components/Card";
import {Api} from "../components/Api";


export const userInfo = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__description', userAvatarSelector: '.profile__avatar'});


//добавил
const api = new Api({
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
                }
            },
            '.elements-cards');
        cardsList.renderItems();
    });
getListItems()

api.getUserInfo()
    .then(data => {
        console.log(data);
        userInfo.setUserInfo({
            name: data.name,
            info: data.about,
            avatar: data.avatar
        })
    })

//было
// const cardsList = new Section({
//         items: initialCards,
//         renderer: (item) => {
//             const cardElement = createCard(item, `${"." + mestoTemplate.classList.value}`);
//             cardsList.addItem(cardElement);
//         }
//     },
//     '.elements-cards');
// cardsList.renderItems();


/*

       https://mesto.nomoreparties.co/v1/cohort-25/users/me
fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
});


 */
const popupProfile = new PopupWithForm('.popup_type_profile', (values) => {
    console.log(values)
    api.updateUserInfo( values['popup-name'], values['popup-job'])
        .then(data => {
            userInfo.setUserInfo({
                name: data.name,
                info: data.about
            })
        })
    });
const popupMesto = new PopupWithForm('.popup_type_mesto', (values) => {
    /*
     {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:10:57.741Z"
  },
     */

    function uuidv4() {
        return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 8 | 0; const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(8);
        });
    }


    const name = values['mesto-name'];
    const link = values['mesto-image-link'];
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
        /*document.querySelector('.elements-cards').innerHTML = ""
        getListItems()*/
        const cardElement = createCard({name, link}, `${"." + mestoTemplate.classList.value}`);
        cardsList.addItem(cardElement);
        addCardFormValidator.reset();
    })

});

const popupMestoImage = new PopupWithImage('.popup_type_image');
popupOpenButton.addEventListener('click', () => {
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















