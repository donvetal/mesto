export class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    /*
    https://mesto.nomoreparties.co/v1/cohort-25/users/me
    fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
});
     */

    listItems = () => this._fetch('GET', '/cards')

    getUserInfo  = () => this._fetch('GET', '/users/me')

    updateUserInfo = (name, about) => this._fetch('PATCH', '/users/me', {name, about})

    addNewCard = (body) => this._fetch('POST', '/cards', body)

    _fetch(method, path, body) {
        let options = {
            method,
            headers: this.headers,
        }
        if((method === 'PATCH' || method == 'POST') && body) {
            options = {
                ...options,
                body: JSON.stringify(body)
            }
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


