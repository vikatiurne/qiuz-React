import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import { useState } from 'react';
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

  const authHandler = () => {};

  return (
    <div className={styles.auth}>
      <p>
        Введіть ім'я та пароль для входу
        <br />
        <span>або пройдіть реєстрацію</span>
      </p>
      <form>
        <Input
          inputType="text"
          onChangeInput={handlerInputName}
          placeholder="Введіть ім'я"
          value={inputName}
          autocomplete="username"
          inputLabel="Ім'я"
          errorMessage="Ім'я має містити мінімум 8 символів"
          inputMessage="Ім'я має містити мінімум 8 символів"
          valid={inputName.trim().length >= 8}
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
          <Button type="success" valid={inputPass.trim().length >= 8 && inputName.trim().length >= 8} title='Увійти'>
            Вхід
          </Button>
          <Button onclick={authHandler} type="primary" valid={true} title="Для реєстрації введіть ім'я та пароль">
            Реєстрація
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
