import './pages/index.css';
import { addCard, deleteCard, putLike } from "./components/card";
import { initialCards } from "./scripts/cards";
import { closePopup, openPopup, openPopupCard } from "./components/modal";

// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const popupEditForm = document.querySelector('.popup_type_edit');
const popupAddForm = document.querySelector('.popup_type_new-card');
export const popupCard = document.querySelector('.popup_type_image');
export const popupCardImage = document.querySelector('.popup__image');
const profileEditButton=document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonList=document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');

// Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(({name, link}) => {
    cardsContainer.append(addCard({name, link}, deleteCard, openPopupCard, putLike));
  })
}

//ПОПАП СЛУШАТЕЛИ
// 1. Открытие попап редактирования профиля
profileEditButton.addEventListener('click', () => openPopup(popupEditForm));

// Открытие попап добавления карточки
profileAddButton.addEventListener('click', () => openPopup(popupAddForm));

// 2. Закрытие любого попап по клику по кнопке закрытия
popupCloseButtonList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

// 3. Закрытие попапа кликом на оверлей
popupList.forEach(popup => (
  document.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  })
));

// 4. Закрытие попапа нажатием на Esc
popupList.forEach(popup => (
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
    }
  })
));

renderCards();