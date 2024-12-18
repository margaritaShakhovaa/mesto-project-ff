// Функция открытия попап форм
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// Функция закрытия попап форм
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Функция закрытие попап по ESC
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

// Функция закрытие попап кликом на оверлей
export function closeByOverlay(evt) {
  if (!evt.target.matches('.popup__is-opened')) {
    closePopup(evt.target);
  }
}