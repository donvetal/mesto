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
export const popupOpenButton = document.querySelector('.profile__button');


//------------------------------- Popup Mesto ----------------------------------//
export const popupOpenMestoButton = document.querySelector('.profile__add-button');

//--------------------------------------Foto popup------------------------------------------//
export const mestoContainer = document.querySelector('.elements-cards');
export const mestoTemplate = document.querySelector('.mesto-template');
//-----------------------Валидация-----------------------------------
export const initialValid =
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__btn',
        inactiveButtonClass: 'popup__btn_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active',
    };