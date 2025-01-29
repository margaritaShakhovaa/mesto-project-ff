const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
  headers: {
    authorization: '596853b5-8122-4b98-9e78-c4664fb82ed3',
    'Content-Type': 'application/json'
  }
}

export function getResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка информации о пользователе с сервера
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponse)
}

// Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getResponse)
}

// Обновление данных профиля
export const updateUser = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
    .then(getResponse)
}

// Добавление новой карточки
export const addNewCardApi = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(getResponse)
}

// Удаление карточки
export const deleteCardApi = (idCard) => {
  return fetch (`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponse)
}

// Постановка лайка
export const putLikeApi = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(getResponse)
}

// Удаление лайка
export const deleteLikeApi = (idCard) => {
  return fetch (`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponse)
}

// Обновление аватара пользователя
export function updateUserAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(getResponse)
}


