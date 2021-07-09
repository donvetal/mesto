export class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    changeAvatar = (link) => this._fetch('PATCH', '/users/me/avatar', {'avatar': link});

    deleteLike = (id) => this._fetch('DELETE', '/cards/likes/' + id);

    putLike = (id) => this._fetch('PUT', '/cards/likes/' + id);

    deleteCard = (id) => this._fetch('DELETE', '/cards/' + id);

    listItems = () => this._fetch('GET', '/cards');

    getUserInfo = () => this._fetch('GET', '/users/me');

    updateUserInfo = (name, about) => this._fetch('PATCH', '/users/me', {name, about});

    addNewCard = (body) => this._fetch('POST', '/cards', body);

    _fetch(method, path, body) {
        let options = {
            method,
            headers: this.headers,
        };
        if ((method === 'PATCH' || method == 'POST') && body) {
            options = {
                ...options,
                body: JSON.stringify(body)
            };
        }
        return fetch(this.url + 'cohort-25' + path, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}


