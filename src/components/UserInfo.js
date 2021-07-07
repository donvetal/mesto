export default class UserInfo {
    constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
        this._profileName = document.querySelector(userNameSelector);
        this._profileInfo = document.querySelector(userInfoSelector);
        this._profileAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            info: this._profileInfo.textContent,
            avatar: this._profileAvatar.src
        };
    }

    setUserInfo({name, info, avatar}) {
        this._profileName.textContent = name;
        this._profileInfo.textContent = info;
        avatar && (this._profileAvatar.src = avatar);
    }

}