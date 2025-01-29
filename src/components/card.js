// Темплейт карточки
import { deleteCardApi, deleteLikeApi, putLikeApi } from "./api";
import { cardsContainer, openPopupCard } from "../index";

export const cardTemplate = document.querySelector('#card-template').content;

// Функция добавления карточки
export function renderCard(card) {
  cardsContainer.prepend(card);
};

// Функция добавления лайка
const putLike = (button, counter, idCard) => {
  return putLikeApi(idCard).then((res) => {
    button.classList.add('card__like-button_is-active');
    counter.textContent = res.likes.length;
  })
    .catch((err) => {console.log(err)});
};

// Функция удаления лайка
const deleteLike = (button, counter, idCard) => {
  return deleteLikeApi(idCard).then((res) => {
    button.classList.remove('card__like-button_is-active');
    counter.textContent = res.likes.length;
  })
    .catch((err) => {console.log(err)});
};

// Функция создания карточки
export function addCard(name, link, likes, idOwner, idCard, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const likesArray = Array.from(likes);

  titleElement.textContent = name;
  imageElement.src = link;
  imageElement.alt = name;
  likeCounter.textContent = likes.length;
  cardElement.id = idCard;

  likesArray.forEach((item) => {
    if (idCard === userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  })

  if (idOwner !== userId) {
    deleteButton.remove();
  }

  // удаление карточки
  deleteButton.addEventListener('click', function () {
    deleteCardApi(idCard).then(() => cardElement.remove())
      .catch((err) => console.log(err))
  })

  // открытие картинки в полный размер
  imageElement.addEventListener('click', () => openPopupCard(name, link));

  // лайк
  likeButton.addEventListener('click', function () {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      deleteLike(likeButton, likeCounter, idCard);
    } else {
      putLike(likeButton, likeCounter, idCard);
    }
  });

  return cardElement;
}