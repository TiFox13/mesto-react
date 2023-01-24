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
import AddPlacePopup from './AddPlacePopup.js';
import PreDeletePopup from './PreDeletePopup.js';

function App() {
  //переменные состояния (пользователь и массив карточек)
  const [currentUser, setCurrentUser] = React.useState([]);
  const [currentCard, setCards] = React.useState([]);

  //Забираем с сервера данные о пользователе
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

  // переменные состояния попапов ( открыты или нет?)
  const [editProfileOpen, setEditProfileOpened] = React.useState(false);
  const [addPlaceOpen, setAddPlaceOpened] = React.useState(false);
  const [editAvatarOpen, setEditAvatarOpened] = React.useState(false);
  const [preDeleteOpen, setPreDeleteOpened] = React.useState(false);
  // переменная состояния для попапа с картинкой (тут хранится картиночка с карточки, которую мы открываем)
  const [selectedCard, setSelectedCard] = React.useState({});

  //это обработчики событий. конкретно, открытия попапов с формами
  function handleEditAvatarClick() {
    setEditAvatarOpened(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpened(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpened(true);
  }

  function handlePreDeleteClick() {
    setPreDeleteOpened(true);
  }

  function handleCardClick(selectedCard)  {
    setSelectedCard(selectedCard);
  }

  // обработчик, закрывающий все попапы
  function closeAllPopups() {
    setEditProfileOpened(false);
    setEditAvatarOpened(false);
    setAddPlaceOpened(false);
    setSelectedCard({});
  }

  //отправляет на сервер новые данные по юзеру
  function handleUpdateUser (item) {
    api.patchUserInfo(item)
      .then((res) =>{
        setCurrentUser(res)
      })
      .then ((res) => {
        closeAllPopups();  //закроем попап
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }

  //отправляет на сервер данные по новому аватару пользователя
  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
      })
      .then ((res) => {
        closeAllPopups();  //закроем попап
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }

  //отправляет на сервер новую карточку
  function handleAddPlaceSubmit(item) {
    api.addNewCard(item)
      .then ((res) => {
        setCards([res, ...currentCard])
      })
      .then ((res) => {
        closeAllPopups();  //закроем попап
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }

  //ЛАЙКИ
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {    // если не лайкали, то надо лайкнуть!
      api.putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((error) => {
          console.log(error); // выведем ошибку в консоль
        });
    } else {   //если лайк уже стоит, то надо его снять
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
       })
        .catch((error) => {
          console.log(error); // выведем ошибку в консоль
        })
    }
  }

  //удаление карточки
  function hendleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
      })
      .then((res) => {
        setCards((state) => state.filter((item) => {
          return item._id !== card._id 
        }) 
        )
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
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
            <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={addPlaceOpen} onClose={closeAllPopups} title={'Новое место'} name={'new-place'} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={editAvatarOpen} onClose={closeAllPopups} /> 
            
            {/* <PreDeletePopup isOpen={preDeleteOpen} onClose={closeAllPopups}/> //создано, но пока не работает. 
            ..разобралась, как подключить, но пока не до конца работает*/}

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </div>
        </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
    )
}

export default App;

