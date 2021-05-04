const openPopupButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup_type_profile');

const closedPopupButton = document.querySelector('.popup__close_type_profile');

let formElementProfile = document.querySelector('.popup__form_type_profile');
let nameInput = formElementProfile.querySelector('.popup__input_type_name');
let jobInput = formElementProfile.querySelector('.popup__input_type_job');

const profileTitle = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function openPopupProfile() {
    popupProfile.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopupProfile() {
    popupProfile.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', openPopupProfile);

closedPopupButton.addEventListener('click', closePopupProfile);


function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    closePopupProfile();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

}

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);


//------------------------------- Popup Mesto----------------------------------//
const openPopupMestoButton = document.querySelector('.profile__add-button');
const popupMesto = document.querySelector('.popup_type_mesto');

const closedPopupMestoButton = document.querySelector('.popup__close_type_mesto');

function openPopupMesto() {
    popupMesto.classList.add('popup_opened');
    nameInputMesto.value = '';
    imageInputMesto.value = '';
}

function closePopupMesto() {
    popupMesto.classList.remove('popup_opened');
}

openPopupMestoButton.addEventListener('click', openPopupMesto);

closedPopupMestoButton.addEventListener('click', closePopupMesto);

let formElementMesto = document.querySelector('.popup__form_type_mesto');
let nameInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-name');
let imageInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-image-link');


const mestoContainer = document.querySelector('.elements-cards');
const mestoTemplate = document.querySelector('.mesto-template');

const initialCards = [
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


function createMesto(nameMesto, imageMesto) {
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


    const closedPopupImageButton = document.querySelector('.popup__close_type_image');
    const imagePopupName = document.querySelector('.popup__description');
    const imagePopupFoto = document.querySelector('.popup__image');


    function openPopupImage() {
        popupMestoImage.classList.add('popup_opened');
        imagePopupName.textContent = mestoName.textContent;
        imagePopupFoto.src = mestoImage.src;


    }

    function closePopupImage() {
        popupMestoImage.classList.remove('popup_opened');
    }

    mestoImage.addEventListener('click', openPopupImage);

    closedPopupImageButton.addEventListener('click', closePopupImage);
    //---------------------------------------------------------------------------//


    cardLikeButton.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('card__like_disabled')) {
            evt.target.classList.remove('card__like_disabled');
            evt.target.classList.add('card__like_active');
        } else {
            evt.target.classList.remove('card__like_active');
            evt.target.classList.add('card__like_disabled');
        }

    });

    mestoName.textContent = nameMesto;
    mestoImage.src = imageMesto;


    mestoRemoveButton.addEventListener('click', handleRemoveMesto);


    return newMesto;
}


function formSubmitHandlerMesto(evt) {
    evt.preventDefault();
    closePopupMesto();
    const nameValue = nameInputMesto.value;
    const imageValue = imageInputMesto.value;

    mestoContainer.prepend(createMesto(nameValue, imageValue));


}

formElementMesto.addEventListener('submit', formSubmitHandlerMesto);
initialCards.forEach(function (element) {
    const newCard = createMesto(element.name, element.link);
    mestoContainer.prepend(newCard);


});













