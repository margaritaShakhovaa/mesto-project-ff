// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard({name, link}, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  titleElement.textContent = name;
  imageElement.src = link;
  imageElement.alt = name;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(({name, link}) => {
    cardsContainer.append(addCard({name, link}, deleteCard));
  })
}

renderCards();