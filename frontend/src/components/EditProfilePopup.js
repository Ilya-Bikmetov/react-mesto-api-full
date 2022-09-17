import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonSubmitName }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser.name, currentUser.about]);

  return (
    <PopupWithForm
      name='place_edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonSubmitName}
    >
      <div className="popup__field">
        <input
          value={name}
          onChange={handleChangeName}
          id="name-input"
          type="text"
          name="username"
          className="popup__input popup__input_edit-form_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="name-input-error" className="popup__input-error">Вы пропустили это поле.</span>
      </div>
      <div className="popup__field">
        <input
          value={description}
          onChange={handleChangeDescription}
          id="job-input"
          type="text"
          name="jobInfo"
          className="popup__input popup__input_edit-form_job"
          placeholder="Профессиональная деятельность"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="job-input-error" className="popup__input-error">Вы пропустили это поле.</span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
