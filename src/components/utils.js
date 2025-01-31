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