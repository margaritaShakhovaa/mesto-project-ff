import { popupCard, popupCardImage } from "../index";

// Функция открытия попап форм
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// Функция закрытия попап форм
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

// Функция открытия попап с картинкой
export function openPopupCard({name, link}) {
  openPopup(popupCard);
  popupCard.querySelector('.popup__caption').textContent = name;
  popupCardImage.src = link;
  popupCardImage.alt = name;
}