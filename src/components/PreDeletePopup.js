import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function PreDeletePopup({onAddCard, isOpen, onClose}) {

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard();
  } 

  return (
    <PopupWithForm buttonText="Да" onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title={'Вы уверены?'} name={'pre-delete'} />
)
}

export default PreDeletePopup;