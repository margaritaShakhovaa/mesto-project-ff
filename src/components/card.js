import { cardTemplate } from "../index";

// Функция создания карточки
export function addCard({name, link}, deleteCard, openPopupCard, putLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  titleElement.textContent = name;
  imageElement.src = link;
  imageElement.alt = name;

  // удаление карточки
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  // открытие картинки в полный размер
  imageElement.addEventListener('click', () => openPopupCard({name, link}));

  likeButton.addEventListener('click', (like) => putLike(like));

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

export function putLike(item) {
  item.target.classList.toggle('card__like-button_is-active');
}

