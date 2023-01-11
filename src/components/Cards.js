import React from "react";

function Card({ onCardClick, card }) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <button type="button" className="trash-button" aria-label="удалить."></button>
      <div className="element__img-container" onClick={handleClick}>
        <img className="element__photo" src={card.link} alt={card.name} />
      </div>
      <div className="element__info">
        <h2 className="element__text">{card.name}</h2>
        <div className="like-area">
          <button type="button" className="like" aria-label="нравится, лайк."></button>
          <p className="like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}


export default Card;