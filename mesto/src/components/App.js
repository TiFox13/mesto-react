
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



  //это обработчики событий. конкретно, откытия попапов с формами
  function handleEditAvatarClick() {
    console.log('аватар открылся?')
    setEditAvatarOpened(true)
}

function handleEditProfileClick() {
    console.log('профиль открылся?')
    setEditProfileOpened(true)
}

function handleAddPlaceClick() {
    console.log('добавление места открылось?')
    setAddPlaceOpened(true)
}

function closeAllPopups() {
    console.log('закрытие отработало?')
    setEditProfileOpened(false)
    setEditAvatarOpened(false)
    setAddPlaceOpened(false)

//не понимаю пока, как вызвать нужный мне  рычаг состония. ПОКА БУДЕТ ТАК! ЧУТЬ ПОЗЖЕ ПОДУМАЮ
}

  return (
    <body className = "page">
    <div className="page__content">
    <Header />
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
    <Footer />
    <ImagePopup />
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

</div>

</body>
  );
}

export default App;


/*
<PopupWithForm active ={popupOpened} setActive ={setPopupOpened} children={editProfile}/>


<div className="popup popup_new-place">
                <input type="submit" className="save-button" value="Создать" aria-label="создать." />
    </div>


<div className="popup popup_pre-delete">
            <input type="submit" className="save-button" value="да" aria-label="да." />
</div>

<div className="popup  popup_edit-profile"> // в изменении аватара тоже "сохранить"
                <input type="submit" className="save-button" value="Сохранить" aria-label="сохранить." />
    </div>
*/