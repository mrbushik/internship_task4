/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react';
import TextField from '../form/textFiled';

const RegisterForm = ({ onChangeAuth, usersList, onEmail }) => {
  const [data, setData] = useState({
    _id: '',
    email: '',
    password: '',
    username: '',
    lastLoginDate: '',
    registrDate: '',
    statusUser: 'USER',
  });
  const [check, setCheck] = React.useState({
    status: true,
    massage: '',
  });

  React.useEffect(() => {
    setData((prevState) => ({ ...prevState, ['_id']: randomInteger(100000000, 999999999) }));
  }, []);
  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  const handleChange = (target) => {
    const dateNow = Date().toString().substring(4, 24);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
      ['lastLoginDate']: dateNow,
      ['registrDate']: dateNow,
    }));
  };
  const submitData = async () => {
    await fetch('https://task4-2cc24-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => onEmail(data.email))
      .then((json) => onChangeAuth(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let receivedUsers = Object.values(usersList).map((item) => item);
    let checkEmail = receivedUsers.find((item) => item.email === data.email);
    if (checkEmail) {
      setCheck((pervState) => ({ status: false, massage: 'такой емаил уже существует' }));

      return;
    }
    if (data.email.trim() === '' || data.password.trim() === '' || data.username.trim() === '') {
      setCheck((pervState) => ({ status: false, massage: 'все поля обязательны для заполнения' }));
      return;
    } else {
      setCheck((pervState) => ({ ...pervState, status: true }));

      submitData();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <TextField label="Имя" name="username" value={data.name} onChange={handleChange} />

      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
      />

      <button className="btn btn-primary w-100 mx-auto" type="submit">
        Submit
      </button>
      {check.status ? '' : <p className="text-danger">{check.massage}</p>}
    </form>
  );
};

export default RegisterForm;
