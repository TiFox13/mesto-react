
import React from 'react';

function ImagePopup() {
 return(
    <div className="popup popup-image popup_big-image">
    <div className=" popup-image__container">
        <button type="button" className="close-button close-button_big-image-popup" /*onClick={handleAddPlaceClick}*/ aria-label="закрыть."></button>
        <div className="popup-image__content">
       <img className="popup-image__image" src="#" alt="" />
       <p className = "popup-image__place-info"></p>
       </div>
    </div>
</div>

 )
}
export default ImagePopup;