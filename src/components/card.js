import { deleteCardApi, deleteLikeApi, putLikeApi } from "./api";


// Функция создания карточки
export function addCard(card, deleteCardHandler, putLikeHandler, deleteLikeHandler, openPopupCardHandler, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  titleElement.textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;
  likeCounter.textContent = card.likes.length;

  card.likes.forEach((item) => {
    if (item._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  })

  // удаление карточки
  if (card.owner._id === userId) {
    deleteButton.addEventListener('click', function () {
      deleteCardApi(card._id).then(() => deleteCardHandler(cardElement))
        .catch((err) => console.log(err))
    })
  } else {
    deleteButton.remove();
  }

  // открытие картинки в полный размер
  imageElement.addEventListener('click', () => openPopupCardHandler(card.name, card.link));

  // лайк
  likeButton.addEventListener('click', function () {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      deleteLikeHandler(likeButton, likeCounter, card._id);
    } else {
      putLikeHandler(likeButton, likeCounter, card._id);
    }
  });

  return cardElement;
}

// Функция удаления карточки
export const deleteCard = (card) => {
  card.remove();
};

// Функция добавления лайка
export const putLike = (button, counter, idCard) => {
  return putLikeApi(idCard).then((res) => {
    button.classList.add('card__like-button_is-active');
    counter.textContent = res.likes.length;
  })
    .catch((err) => {console.log(err)});
};

// Функция удаления лайка
export const deleteLike = (button, counter, idCard) => {
  return deleteLikeApi(idCard).then((res) => {
    button.classList.remove('card__like-button_is-active');
    counter.textContent = res.likes.length;
  })
    .catch((err) => {console.log(err)});
};