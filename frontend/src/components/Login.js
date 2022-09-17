import InfoTooltip from './InfoTooltip.js';
import failLoginPath from '../images/login_issue.svg';
import { useState } from 'react';

function Login({ isOpen, onClose, onSubmit }) {
  const [inputData, setInputData] = useState({ email: '', password: '' });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: inputData.email, password: inputData.password });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="profile-form">
        <h1 className="profile-form__title">Вход</h1>
        <input
          className="profile-form__input"
          name="email"
          placeholder="Email"
          type="email"
          required
          value={inputData.email}
          onChange={handleInput}
        />
        <input
          className="profile-form__input"
          name="password"
          placeholder="Пароль"
          type="password"
          required
          value={inputData.password}
          onChange={handleInput}
        />
        <button className="profile-form__btn" type="submit" aria-label="Войти">Войти</button>
      </form>
      <InfoTooltip
        onClose={onClose}
        isOpen={isOpen}
        title={'Что-то пошло не так! Попробуйте ещё раз.'}
        urlImg={`${failLoginPath}`}
      />
    </>
  );
}

export default Login;
