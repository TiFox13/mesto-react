import React from 'react';
import logo from '../logo.svg';

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import {CurrentCardContext} from '../contexts/CurrentCardContext.js'
import { api } from '../utils/Api.js'

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';

function App() {

//переменные состояния
  const [currentUser, setCurrentUser] = React.useState([]);
  const [currentCard, setCards] = React.useState([]);

  //ЗАбираем с сервера данные о пользователе
  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }, [])

// забираем с сервера карточки
  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }, [])

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
  }


  function handleUpdateUser (item) {
    console.log(item)
    api.patchUserInfo(item)
    .then((res) =>{
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((error) => {
      console.log(error); // выведем ошибку в консоль
    })
  }

  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((error) => {
      console.log(error); // выведем ошибку в консоль
    })
}


  //ЛАЙКИ
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.putLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      });
    } else {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      });
    }
  }


  //ПОКА НЕ РАБОТАЕТ!
  function hendleCardDelete(card) {
const cards = currentCard;
    api.deleteCard(card._id)
    .then((res) => {
      const newCards = cards.filter((item) => {
         return item
       })
      setCards(newCards)
    })
    .catch((error) => {
      console.log(error); // выведем ошибку в консоль
    });
  }





  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={currentCard}>
        <div className = "page">
          <div className="page__content">
            <Header />
            <Main onCardDelete={hendleCardDelete} onCardLike={handleCardLike}  onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
            <Footer />


            <EditProfilePopup onUpdateUser={handleUpdateUser}  isOpen={editProfileOpen} onClose={closeAllPopups} /> 
            

            <PopupWithForm  buttonText="Создать" isOpen={addPlaceOpen} setActive={setAddPlaceOpened} onClose={closeAllPopups} title={'Новое место'} name={'new-place'}>
              <label className = "form__input-field">
                <input type="text" id="place-name-input" className="form__item form__item_content_place-name" name="name" placeholder="Название" required minLength="2" maxLength="30" />
                <span className = "form__item-error place-name-input-error"></span>
              </label>
              <label className = "form__input-field">
                <input type="url" id="place-image-input" className="form__item form__item_content_place-image" name="link" placeholder="Ссылка на картинку" required />
                <span className = "form__item-error place-image-input-error"></span>
              </label>
            </PopupWithForm>

            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={editAvatarOpen} onClose={closeAllPopups} /> 

            <PopupWithForm buttonText="Да" title={'Вы уверены?'} name={'pre-delete'}>
              <h2 className="form__heading">Вы уверены?</h2>
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </div>
        </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
 
}

export default App;

