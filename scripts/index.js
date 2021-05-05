const popupOpenButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup_type_profile');

const popupCloseButton = document.querySelector('.popup__close_type_profile');

let formElementProfile = document.querySelector('.popup__form_type_profile');
let nameInput = formElementProfile.querySelector('.popup__input_type_name');
let jobInput = formElementProfile.querySelector('.popup__input_type_job');

const profileTitle = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function openPopup(popup) {
    popup.classList.add('popup_opened'); //добавляем к popup класс popup_opened
}

function closePopup(popup) {
    popup.classList.remove('popup_opened'); //удаляем у popup класс popup_opened
}

function openPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}


function closePopupProfile() {
    closePopup(popupProfile);
}

popupOpenButton.addEventListener('click', openPopupProfile);

popupCloseButton.addEventListener('click', closePopupProfile);


function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    closePopupProfile();
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
    nameInputMesto.value.remove();
    imageInputMesto.value.remove();
}

function hendleClosePopupMesto() {
    closePopup(popupMesto);
}

popupOpenMestoButton.addEventListener('click', handleOpenPopupMesto);

popupCloseMestoButton.addEventListener('click', hendleClosePopupMesto);

let formElementMesto = document.querySelector('.popup__form_type_mesto');
let nameInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-name');
let imageInputMesto = formElementMesto.querySelector('.popup__input_type_mesto-image-link');


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


    }

    function closePopupImage() {
        closePopup(popupMestoImage);
    }

    mestoImage.addEventListener('click', openPopupImage);

    popupCloseImageButton.addEventListener('click', closePopupImage);
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


}

formElementMesto.addEventListener('submit', handleFormSubmitMesto);
initialCards.forEach(function (element) {
    const newCard = createMesto({nameMesto: element.name, imageMesto: element.link});
    mestoContainer.append(newCard);


});













