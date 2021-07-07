export default class Section {
    constructor({items, renderer}, containerSelector, api) {
        this._container = document.querySelector(containerSelector);
        this._initialArray = items;
        this._renderer = renderer;
        //добавил
        this._api = api;
    }

    renderItems() {
        this._initialArray.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
//было
// export default class Section {
//     constructor({items, renderer}, containerSelector) {
//         this._container = document.querySelector(containerSelector);
//         this._initialArray = items;
//         this._renderer = renderer;
//     }
//
//     renderItems() {
//         this._initialArray.forEach((item) => {
//             this._renderer(item);
//         });
//     }
//
//     addItem(element) {
//         this._container.prepend(element);
//     }
// }