
import React from 'react';

function PopupWithForm({ buttonText, isOpen, onClose, title, name, children }) {

  return (

    <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
      <div className='popup__container'>
        <button type="button" onClick={onClose} className="close-button" aria-label="закрыть."></button>
        <form className='form' name={name} method='post'>
          <h2 className="form__heading">{title}</h2>
          {children}
          <input type="submit" className="save-button" value={buttonText}/*по идее где-то создать, где-то сохранить или "да". может это тоже через пропс передать */ aria-label="создать." />
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
