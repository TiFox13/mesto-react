
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
