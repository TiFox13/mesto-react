
import React from 'react';
import logo from '../logo.svg';

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

//переменные состояния
const [editProfileOpen, setEditProfileOpened] = React.useState(false);
const [addPlaceOpen, setAddPlaceOpened] = React.useState(false);
const [editAvatarOpen, setEditAvatarOpened] = React.useState(false);

const [selectedCard, setSelectedCard] = React.useState({})

  //это обработчики событий. конкретно, откытия попапов с формами
  function handleEditAvatarClick() {
    setEditAvatarOpened(true)
}

function handleEditProfileClick() {
    setEditProfileOpened(true)
}

function handleAddPlaceClick() {
    setAddPlaceOpened(true)
}

function handleCardClick(selectedCard)  {
    setSelectedCard(selectedCard);

}

function closeAllPopups() {
    setEditProfileOpened(false)
    setEditAvatarOpened(false)
    setAddPlaceOpened(false)
    setSelectedCard({})
//не понимаю пока, как вызвать нужный мне  рычаг состония. чтобы передать, какой именно попап надо закрыть
//ПОКА БУДЕТ ТАК! ЧУТЬ ПОЗЖЕ ПОДУМАЮ
}

  return (
    <body className = "page">
    <div className="page__content">
    <Header />
    <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
    <Footer />
<PopupWithForm isOpen={editProfileOpen} setActive={setEditProfileOpened} onClose={closeAllPopups} title ={'Редактировать профиль'} name={'edit-profile'}>
<label className = "form__input-field">
    <input type="text" id ="account-name-input" className="form__item form__item_content_name" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
    <span className = "form__item-error account-name-input-error"></span>
</label>
<label className = "form__input-field">
    <input type="text" id ="account-about-input" className="form__item form__item_content_about" name="about" placeholder="О себе" required minLength="2" maxLength="200" />
    <span className = "form__item-error account-about-input-error"></span>
</label>
</PopupWithForm>

<PopupWithForm isOpen={addPlaceOpen} setActive={setAddPlaceOpened} onClose={closeAllPopups} title={'Новое место'} name={'new-place'}>
    <label className = "form__input-field">
        <input type="text" id="place-name-input" className="form__item form__item_content_place-name" name="name" placeholder="Название" required minLength="2" maxLength="30" />
        <span className = "form__item-error place-name-input-error"></span>
    </label>
    <label className = "form__input-field">
        <input type="url" id="place-image-input" className="form__item form__item_content_place-image" name="link" placeholder="Ссылка на картинку" required />
        <span className = "form__item-error place-image-input-error"></span>
    </label>
</PopupWithForm>

<PopupWithForm isOpen={editAvatarOpen} setActive={setEditAvatarOpened} onClose={closeAllPopups} title={'Обновить аватар'} name={'new-avatar'}>
    <label className = "form__input-field">
        <input type="url" id="avatar-image-input" className="form__item form__item_content_avatar-image" name="link" placeholder="Ссылка на картинку" required />
        <span className = "form__item-error avatar-image-input-error"></span>
    </label>
</PopupWithForm>

<PopupWithForm title={'Вы уверены?'} name={'pre-delete'}>
<h2 className="form__heading">Вы уверены?</h2>
</PopupWithForm>

<ImagePopup card={selectedCard} onClose={closeAllPopups}/>
</div>

</body>
  );
}

export default App;

