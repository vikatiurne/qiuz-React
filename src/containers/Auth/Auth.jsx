import { useState } from 'react';
import axios from 'axios';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import Button from '../../componets/UI/Button/Button';
import Input from '../../componets/UI/Input/Input';

import styles from './Auth.module.css';

const Auth = () => {
  const [inputName, setInputName] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [tachedName, setTachedName] = useState(false);
  const [tachedPass, setTachedPass] = useState(false);
  const [eye, setEye] = useState(true);
  const [inputType, setInputType] = useState('password');

  const handlerInputName = (e) => {
    setTachedName(true);
    setInputName(e.target.value);
  };
  const handlerInputPass = (e) => {
    setTachedPass(true);
    setInputPass(e.target.value);
  };

  const openEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'password') setInputType('text');
  };
  const closeEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'text') setInputType('password');
  };

  const loginHandler = async () => {
    const authData = { 
      email: inputName, 
      password: inputPass,
      returnSecureToken: true };
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXPJFdxpRxSO6L5VFX0Hdc2gl5RSQQthQ',
        authData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const authHandler = async () => {
    const authData = { 
      email: inputName, 
      password: inputPass,
      returnSecureToken: true };
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXPJFdxpRxSO6L5VFX0Hdc2gl5RSQQthQ',
        authData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.auth}>
      <p>
        Введіть e:mail та пароль для входу
        <br />
        <span>або пройдіть реєстрацію</span>
      </p>
      <form onSubmit={(e)=>e.preventDefault()}>
        <Input
          inputType="text"
          onChangeInput={handlerInputName}
          placeholder="Введіть e-mail"
          value={inputName}
          autocomplete="username"
          inputLabel="E:mail"
          errorMessage="E:mail має містити символ @"
          inputMessage="E:mail має містити символ @"
          valid={/^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}.){1,}[-A-Za-z]{2,})$/gi.test(
            inputName
          )}
          tached={tachedName}
        />
        <Input
          inputType={inputType}
          onChangeInput={handlerInputPass}
          placeholder="Введіть пароль"
          value={inputPass}
          autocomplete="current-password"
          inputLabel="Пароль"
          errorMessage="Введіть коректний пароль"
          inputMessage="Пароль має містити мінімум 8 символів"
          valid={inputPass.trim().length >= 8}
          tached={tachedPass}
        />
        <RxEyeClosed
          onClick={openEyeHandler}
          className={eye ? styles.visible : styles.hide}
        />
        <RxEyeOpen
          onClick={closeEyeHandler}
          className={eye ? styles.hide : styles.visible}
        />
        <div className={styles.authActive}>
          <Button
          onclick={loginHandler}
            type="success"
            valid={inputPass.trim().length >= 8 && inputName.trim().length >= 8}
            title="Увійти"
          >
            Вхід
          </Button>
          <Button
            onclick={authHandler}
            type="primary"
            valid={true}
            title="Для реєстрації введіть ім'я та пароль"
          >
            Реєстрація
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
