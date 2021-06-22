// import {initialCards, mestoContainer, mestoTemplate} from "../utils/constants";
// import {createCard} from "../utils/utils";

export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._conteiner = document.querySelector(containerSelector);
    }

    renderItems() {
        this._initialArray.forEach((item) => {
            this._renderer(item);
            // const cardElement = createCard(item, `${"." + mestoTemplate.classList.value}`);
            // this.addItem(cardElement);
        });
    }

    addItem(element) {
        this._conteiner.append(element);
    }
}