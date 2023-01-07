import React from 'react';

import avatar from '../images/avatar.jpg'
import {api} from '../utils/Api.js'
function Main({onAddPlace, onEditAvatar, onEditProfile}) {
const [userName, setUserName]= React.useState();
const [userDescription, setUserDescription] = React.useState();
const [userAvatar, setUserAvatar]  = React.useState();

React.useEffect(() =>{
    api.getUserInfo()
    .then((res)=>{
        setUserName(res.name);
        setUserAvatar(res.avatar);
        setUserDescription(res.about);
    })
    .catch ((error) => {
        console.log(error); // выведем ошибку в консоль
      })
},[])

    const [cards, setCards] = React.useState([])

    React.useEffect(()=> {
        api.getInitialCards()
        .then((res)=>{
//вот здесь надо что-то сделать? сюда темплате?
            <article className="element">
            <button type="button" className="trash-button" aria-label="удалить."></button>
            <div className="element__img-container">
                <img className="element__photo" src="#" alt="" />
            </div>
            <div className="element__info">
                <h2 className="element__text"></h2>
                <div className = "like-area">
                    <button type="button" className="like" aria-label="нравится, лайк."></button>
                    <p className ="like-counter">1</p>
                </div>

            </div>
            </article>
        })
        .catch ((error) => {
            console.log(error); // выведем ошибку в консоль
          })
    })


    return (
        <main>
        <section className="profile">
            <div className="profile__info">
                <button type="button" onClick={onEditAvatar} className="avatar-button" aria-label="добавить."><img className="profile__avatar" src={userAvatar} /></button>

                <div className="profile__text">
                    <h1 className="profile__name">Жак-Ив Кусто</h1>
                    <button type="button" onClick={onEditProfile} className="edit-button" aria-label="редактировать профиль."></button>
                    <p className="profile__about">Исследователь океана</p>
                </div>
            </div>
            <button type="button" className="add-button" onClick={onAddPlace} aria-label="добавить."></button>
        </section>


        <section className="elements">
            <template id = "template-card">
                <article className="element">
                    <button type="button" className="trash-button" aria-label="удалить."></button>
                    <div className="element__img-container">
                        <img className="element__photo" src="#" alt="" />
                    </div>
                    <div className="element__info">
                        <h2 className="element__text"></h2>
                        <div className = "like-area">
                            <button type="button" className="like" aria-label="нравится, лайк."></button>
                            <p className ="like-counter">1</p>
                        </div>

                    </div>
                </article>
            </template>
          </section>
    </main>
    )
}

export default Main;