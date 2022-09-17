
function InfoTooltip({ isOpen, onClose, title, urlImg }) {

  return (

    <div className={`popup  ${isOpen && 'popup_active'}`}>
      <div className="popup__content popup__content_user_profile">
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть"></button>
        <div style={{ backgroundImage: `url(${urlImg})` }} className="popup__content__image" />
        <h2 className="popup__title">{title}</h2>
      </div>
    </div>

  );
}

export default InfoTooltip;
