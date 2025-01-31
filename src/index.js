import './pages/index.css';
import { addCard, deleteCard, deleteLike, putLike } from "./components/card";
import { closeByOverlay, closePopup, openPopup } from "./components/modal";
import { clearValidation, enableValidation } from "./components/validation";
import { renderCreateLoading, renderSaveLoading } from "./components/utils";
import { addNewCardApi, getInitialCards, getUser, updateUser, updateUserAvatar } from "./components/api";

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
// попапы
const popupList = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_new-card');
const popupAvatarElement = document.querySelector('.popup_type_avatar');
export const popupCardElement = document.querySelector('.popup_type_image');
export const popupCardImage = document.querySelector('.popup__image');
// кнопки
const profileEditButton=document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image-button');
const popupCloseButtonList= document.querySelectorAll('.popup__close');
// форма и инпуты редактирования профиля
const editFormElement = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const descriptionInput = editFormElement.querySelector('.popup__input_type_description');
// форма и инпуты редактирования аватара
const avatarFormElement = document.forms['edit-avatar'];
const profileAvatar = document.querySelector('.profile__image');
const avatarInput = avatarFormElement.querySelector('.popup__input_type_avatar');
// форма и инпуты добавления новой карточки
const addCardFormElement = document.forms['new-place'];
const nameCardInput = addCardFormElement.querySelector('.popup__input_type_card-name');
const linkCardInput = addCardFormElement.querySelector('.popup__input_type_url');

let userId;

// Функция добавления карточки
function renderCard(card) {
  cardsContainer.prepend(card);
}

// Загрузка информации о пользователе с сервера и загрузка карточек с сервера
Promise.all([getUser(), getInitialCards()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`
    cards.forEach(card => cardsContainer.append(addCard(card, deleteCard, putLike, deleteLike, openPopupCard, userId)))
  })
  .catch(err => console.log(err))


// ПОПАП РЕДАКТИРОВАНИЯ И СОХРАНЕНИЯ ИНФОРМАЦИИ О СЕБЕ
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  renderSaveLoading(popupEditElement, true);
  updateUser(nameInput.value, descriptionInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
      closePopup(popupEditElement);
    })
    .catch(err => console.log(err))
    .finally(() => renderSaveLoading(popupEditElement, false))
}
editFormElement.addEventListener('submit', handleEditFormSubmit);


// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  renderCreateLoading(popupAddElement, true);
  addNewCardApi(nameCardInput.value,linkCardInput.value)
    .then((card) => {
      renderCard(addCard(card, deleteCard, putLike, deleteLike, openPopupCard, userId));
      closePopup(popupAddElement);
      addCardFormElement.reset();
    })
    .catch(err => console.log(err))
    .finally(() => renderCreateLoading(popupAddElement, false))
}
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);


// ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
function handleSubmitAvatar (evt) {
  evt.preventDefault();
  renderSaveLoading(popupAvatarElement, true);
  updateUserAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupAvatarElement);
    })
    .catch(err => console.log(err))
    .finally(() => renderSaveLoading(popupAvatarElement, false))
}
avatarFormElement.addEventListener('submit', handleSubmitAvatar);


// Функция открытия попап с картинкой
export function openPopupCard(name, link) {
  openPopup(popupCardElement);
  popupCardElement.querySelector('.popup__caption').textContent = name;
  popupCardImage.src = link;
  popupCardImage.alt = name;
}

//ПОПАП СЛУШАТЕЛИ
// 1. Открытие попап редактирования профиля
profileEditButton.addEventListener('click', function () {
  clearValidation(editFormElement, settings);
  openPopup(popupEditElement);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

// 2. Открытие попап редактирования аватара
avatarEditButton.addEventListener('click', function () {
  openPopup(popupAvatarElement);
  avatarFormElement.reset();
  clearValidation(avatarFormElement, settings);
})

// 3. Открытие попап добавления карточки
profileAddButton.addEventListener('click', function () {
  openPopup(popupAddElement);
  addCardFormElement.reset();
  clearValidation(addCardFormElement, settings);
});

// 4. Закрытие любого попап по клику по кнопке закрытия
popupCloseButtonList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

// 5. Закрытие попапа кликом на оверлей
popupList.forEach(popup => (
  popup.addEventListener('click', closeByOverlay)
));

// Включение валидации форм
enableValidation(settings);