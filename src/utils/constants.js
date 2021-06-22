export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
//--------------------------перенес из index.js----------------------------------------------//
export const popupOpenButton = document.querySelector('.profile__button');
export const popupProfile = document.querySelector('.popup_type_profile');
export const formElementProfile = document.querySelector('.popup__form_type_profile');
export const nameInput = formElementProfile.querySelector('.popup__input_type_name');
export const jobInput = formElementProfile.querySelector('.popup__input_type_job');

export const profileTitle = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

//------------------------------- Popup Mesto перенес из index.js----------------------------------//
export const popupOpenMestoButton = document.querySelector('.profile__add-button');
export const popupMesto = document.querySelector('.popup_type_mesto');

export const popupCloseMestoButton = document.querySelector('.popup__close_type_mesto');

export const formElementMesto = document.querySelector('.popup__form_type_mesto');
export const nameInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-name');
export const imageInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-image-link');


//--------------------------------------Foto popup------------------------------------------//
export const mestoContainerSelector = '.elements-cards';
export const mestoContainer = document.querySelector('.elements-cards');
export const mestoTemplate = document.querySelector('.mesto-template');

//-----------------------Валидация-----------------------------------
export const popupContainer = popupProfile.querySelector('.popup__form');
export const popupContainerElem = popupMesto.querySelector('.popup__form');