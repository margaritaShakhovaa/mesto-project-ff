export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Функция переключения состояния кнопки
export function setButtonState(button, isFormValid) {
  if(isFormValid) {
    button.classList.add(settings.inactiveButtonClass);
  } else {
    button.classList.remove(settings.inactiveButtonClass);
  }
}

// Функция переключения кнопки "Сохранить"
export function renderSaveLoading(popup, isLoading) {
  const submitButton = popup.querySelector('.popup__button');
  if(isLoading) {
    submitButton.textContent = 'Сохранение...'
    submitButton.disabled = true;
  } else {
    submitButton.textContent = 'Сохранить'
    submitButton.disabled = false;
  }
}
// Функция переключения кнопки "Создать"
export function renderCreateLoading(popup, isLoading) {
  const submitButton = popup.querySelector('.popup__button');
  if(isLoading) {
    submitButton.textContent = 'Сохранение...'
    submitButton.disabled = true;
  } else {
    submitButton.textContent = 'Создать'
    submitButton.disabled = false;
  }
}