import './pages/index.css';
import { addCard, renderCard } from "./components/card";
import { closeByOverlay, closePopup, openPopup } from "./components/modal";
import { clearValidation, enableValidation } from "./components/validation";
import { renderCreateLoading, renderSaveLoading, setButtonState, settings } from "./components/utils";
import { addNewCardApi, getInitialCards, getUser, updateUser, updateUserAvatar } from "./components/api";

// DOM узлы
export const cardsContainer = document.querySelector('.places__list');
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
const submitProfileButton = editFormElement.querySelector('.popup__button');
// форма и инпуты редактирования аватара
const avatarFormElement = document.forms['edit-avatar'];
const profileAvatar = document.querySelector('.profile__image');
const avatarInput = avatarFormElement.querySelector('.popup__input_type_avatar');
const submitAvatarButton = avatarFormElement.querySelector('.popup__button');
// форма и инпуты добавления новой карточки
const addCardFormElement = document.forms['new-place'];
const nameCardInput = addCardFormElement.querySelector('.popup__input_type_card-name');
const linkCardInput = addCardFormElement.querySelector('.popup__input_type_url');
const submitAddCardButton = addCardFormElement.querySelector('.popup__button');

let userId;

// Загрузка информации о пользователе с сервера и загрузка карточек с сервера
Promise.all([getUser(), getInitialCards()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    cards.forEach(item => cardsContainer.append(addCard(item.name, item.link, item.likes, item.owner._id, item._id, userId)))
  })
  .catch(err => console.log(err))


// ПОПАП РЕДАКТИРОВАНИЯ И СОХРАНЕНИЯ ИНФОРМАЦИИ О СЕБЕ
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  renderSaveLoading(popupEditElement, true);
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  updateUser(nameInput.value, descriptionInput.value).then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => renderSaveLoading(popupEditElement, false))
  closePopup(popupEditElement);
}
editFormElement.addEventListener('submit', handleEditFormSubmit);


// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  renderCreateLoading(popupAddElement, true);
  addNewCardApi(nameCardInput.value,linkCardInput.value).then(card => renderCard(addCard(card.name, card.link, card.likes, card.owner._id, card._id, userId)))
    .catch(err => console.log(err))
  .finally(() => renderCreateLoading(popupAddElement, false))
  closePopup(popupAddElement);
  addCardFormElement.reset();
}
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);


// ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
function handleSubmitAvatar (evt) {
  evt.preventDefault();
  renderSaveLoading(popupAvatarElement, true);
  updateUserAvatar(avatarInput.value).then(res => profileAvatar.style.backgroundImage = `url(${res.avatar})`)
    .catch(err => console.log(err))
  .finally(() => renderSaveLoading(popupAvatarElement, false))
  closePopup(popupAvatarElement);
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
  clearValidation(popupEditElement);
  nameInput.value =profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditElement);
  setButtonState(submitProfileButton, true);
});

// 2. Открытие попап редактирования аватара
avatarEditButton.addEventListener('click', function () {
  clearValidation(popupAvatarElement);
  openPopup(popupAvatarElement);
  avatarFormElement.reset();
  setButtonState(submitAvatarButton, true);
})

// 3. Открытие попап добавления карточки
profileAddButton.addEventListener('click', function () {
  clearValidation(popupAddElement);
  openPopup(popupAddElement);
  addCardFormElement.reset();
  setButtonState(submitAddCardButton, true);
});

// 4. Закрытие любого попап по клику по кнопке закрытия
popupCloseButtonList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

// 4. Закрытие попапа кликом на оверлей
popupList.forEach(popup => (
  popup.addEventListener('click', closeByOverlay)
));

// Включение валидации форм
enableValidation(settings);