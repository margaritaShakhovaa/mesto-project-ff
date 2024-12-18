import './pages/index.css';
import { addCard, deleteCard, putLike } from "./components/card";
import {closeByOverlay, closePopup, openPopup} from "./components/modal";
import { initialCards } from "./scripts/cards";

// DOM узлы
export const cardsContainer = document.querySelector('.places__list');
// попапы
const popupList = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_new-card');
export const popupCardElement = document.querySelector('.popup_type_image');
export const popupCardImage = document.querySelector('.popup__image');
// кнопки
const profileEditButton=document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonList= document.querySelectorAll('.popup__close');
// форма и инпуты редактирования профиля
const editFormElement = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const descriptionInput = editFormElement.querySelector('.popup__input_type_description');
// форма и инпуты добавления новой карточки
const addCardFormElement = document.forms['new-place'];
const nameCardInput = addCardFormElement.querySelector('.popup__input_type_card-name');
const linkCardInput = addCardFormElement.querySelector('.popup__input_type_url');

// Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(({name, link}) => {
    cardsContainer.append(addCard({name, link}, deleteCard, openPopupCard, putLike));
  })
}

// Функция добавления карточки
function renderCard(card) {
  cardsContainer.prepend(card);
}

// Функция открытия попап с картинкой
export function openPopupCard({name, link}) {
  openPopup(popupCardElement);
  popupCardElement.querySelector('.popup__caption').textContent = name;
  popupCardImage.src = link;
  popupCardImage.alt = name;
}

// Вывести карточки на страницу
renderCards();

//ПОПАП СЛУШАТЕЛИ
// 1. Открытие попап редактирования профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value =profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditElement);
});

// 2. Открытие попап добавления карточки
profileAddButton.addEventListener('click', () => openPopup(popupAddElement));

// 3. Закрытие любого попап по клику по кнопке закрытия
popupCloseButtonList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

// 4. Закрытие попапа кликом на оверлей
popupList.forEach(popup => (
  popup.addEventListener('click', closeByOverlay)
));

// ПОПАП РЕДАКТИРОВАНИЯ И СОХРАНЕНИЯ ИНФОРМАЦИИ О СЕБЕ
// 1. Находим форму в DOM
// 2. Находим поля формы в DOM
// 3. Обработчик «отправки» формы
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditElement);
}
// 4. Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', handleEditFormSubmit);


// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
// 1. Находим форму в DOM
// 2. Обработчик «отправки» формы
export function handleAddCardFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Элементы, куда будет вставлено новое значение
  const name = nameCardInput.value;
  const link= linkCardInput.value;
  renderCard(addCard({name, link}, deleteCard, openPopupCard, putLike));
  closePopup(popupAddElement);
  addCardFormElement.reset();
}
// 3. Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);