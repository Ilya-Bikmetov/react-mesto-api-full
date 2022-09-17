function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children, buttonText }) {


  return (
      <div className={`popup popup_${name} ${isOpen && 'popup_active'}`}>
        <form onSubmit={onSubmit} className="popup__content" name={`${name}`}>
          <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть"></button>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__btn" type="submit" aria-label={buttonText}>{buttonText}</button>
        </form>
      </div>
  );
}

export default PopupWithForm;
