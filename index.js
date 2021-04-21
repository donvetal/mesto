const openPopupButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');

const closedPopupButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

const profileTitle = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function togglePopup(event) {
    event.preventDefault();
    popup.classList.toggle('popup_opened');

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

openPopupButton.addEventListener('click', togglePopup);

closedPopupButton.addEventListener('click', togglePopup);


function formSubmitHandler(evt) {
    evt.preventDefault();
    popup.classList.toggle('popup_opened');
    let name = nameInput.value;
    let job = jobInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;

}

formElement.addEventListener('submit', formSubmitHandler);

document.onkeydown = function (evt) {
    switch (evt.code) {
        case 'Enter':
            formSubmitHandler(evt);
            break;
        default:
            break;
    }
};


