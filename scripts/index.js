const openPopupButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');

const closedPopupButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

const profileTitle = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', openPopup);

closedPopupButton.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
    evt.preventDefault();
    closePopup();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

}

formElement.addEventListener('submit', formSubmitHandler);



