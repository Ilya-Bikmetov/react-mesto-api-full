import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup({ isOpen, onClose, onSubmit, card, buttonSubmitName }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name='delete_card'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonSubmitName}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default DeleteCardPopup;
