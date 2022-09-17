import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, buttonSubmitName }) {
  const avatarLink = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  useEffect(() => {
    if (isOpen)
      avatarLink.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      buttonText={buttonSubmitName}
    >
      <div className="popup__field">
        <input
          ref={avatarLink}
          id="avatar-url-input"
          type="url"
          name="avatarLink"
          className="popup__input popup__input_avatar-form_link"
          placeholder="Ссылка на аватар"
          required
        />
        <span id="avatar-url-input-error" className="popup__input-error">Введите адрес сайта.</span>
      </div>
    </PopupWithForm>
  )
}
