export default class UserInfo {
    constructor({userNameSelector, userInfoSelector}) {
        this._profileName = document.querySelector(userNameSelector);
        this._profileInfo = document.querySelector(userInfoSelector);
        this.setUserInfo({name: 'Жак-Ив Кусто', info: 'Исследователь океана'});
    }

    getUserInfo() {
        return {name: this._profileName.textContent, info: this._profileInfo.textContent};
    }

    setUserInfo({name, info}) {
        this._profileName.textContent = name;
        this._profileInfo.textContent = info;
    }
}