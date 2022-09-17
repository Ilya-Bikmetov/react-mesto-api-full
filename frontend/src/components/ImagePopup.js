function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_place_img ${isOpen && 'popup_active'}`}>
      <div className="popup__content-img">
        <button onClick={onClose} className="popup__close popup__close_form_img" type="button" aria-label="Закрыть"></button>
        <img className="popup__img" src={`${card.link}`} alt={card.name} />
        <p className="popup__img-sign">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
