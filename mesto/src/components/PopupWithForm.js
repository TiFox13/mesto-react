
import React from 'react';

function PopupWithForm({isOpen, onClose, title, name, children}) {

 return(

 <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
    <div className='popup__container'>
    <button type="button" onClick={onClose} className="close-button" /*уберу лишшний класс. он же увроде нигде не юзается*/aria-label="закрыть."></button>
        <form className='form' name = "edit-form"/*(по идее тут нужен name из пропса*/ method= 'post'>
        <h2 className="form__heading">{title}</h2>
        {children}
        <input type="submit" className="save-button" value="Создать"/*по идее где-то создать, где-то сохранить или "да". может это тоже через пропс передать */ aria-label="создать." />
        </form>
        </div>
 </div>
 )
}

export default PopupWithForm;

/*
//пропс:edit-profile, title: Редактировать профиль
<form className="form" name="edit-form" method="post">
    <h2 className="form__heading">Редактировать профиль</h2>
<label className = "form__input-field">
    <input type="text" id ="account-name-input" className="form__item form__item_content_name" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
    <span className = "form__item-error account-name-input-error"></span>
</label>
<label className = "form__input-field">
    <input type="text" id ="account-about-input" className="form__item form__item_content_about" name="about" placeholder="О себе" required minLength="2" maxLength="200" />
    <span className = "form__item-error account-about-input-error"></span>
</label>
    <input type="submit" className="save-button" value="Сохранить" aria-label="сохранить." />
</form>


//пропс: (new-place, title: Новое место)
<form className="form new-place-form" name="edit-form" method="post">
    <h2 className="form__heading">Новое место</h2>
<label className = "form__input-field">
    <input type="text" id="place-name-input" className="form__item form__item_content_place-name" name="name" placeholder="Название" required minLength="2" maxLength="30" />
    <span className = "form__item-error place-name-input-error"></span>
</label>
<label className = "form__input-field">
    <input type="url" id="place-image-input" className="form__item form__item_content_place-image" name="link" placeholder="Ссылка на картинку" required />
    <span className = "form__item-error place-image-input-error"></span>
</label>
    <input type="submit" className="save-button" value="Создать" aria-label="создать." />
</form>

//пропс: (new-avatar, title: Обновить аватар)
<form className="form new-avatar-form" name="edit-form" method="post">
    <h2 className="form__heading">Обновить аватар</h2>
<label className = "form__input-field">
    <input type="url" id="avatar-image-input" className="form__item form__item_content_avatar-image" name="link" placeholder="Ссылка на картинку" required />
    <span className = "form__item-error avatar-image-input-error"></span>
</label>
    <input type="submit" className="save-button" value="сохранить" aria-label="сохранить." />
</form>

//пропс: (pre-delete, title: Вы уверены?)
<form className="form pre-delete-form" name="edit-form" method="post">
    <h2 className="form__heading">Вы уверены?</h2>
    <input type="submit" className="save-button" value="да" aria-label="да." />
</form>
*/