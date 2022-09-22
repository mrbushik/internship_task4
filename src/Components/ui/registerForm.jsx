/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react';
import TextField from '../form/textFiled';

const RegisterForm = ({ onChangeAuth }) => {
  const [data, setData] = useState({
    _id: '',
    email: '',
    password: '',
    username: '',
    lastLoginDate: '',
    registrDate: '',
    statusUser: 'USER',
  });
  const [check, setCheck] = React.useState(true);
  const [status, setStatus] = React.useState(false);

  React.useEffect(() => {
    if (status) {
      onChangeAuth(true);
    }
  }, [status]);
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
      .then(function (response) {
        console.log(response.ok);
        setStatus(response.ok);
        return response;
      })
      // не забыть поменять емаил на  токен
      .then((response) => response.json())
      .then((json) => localStorage.setItem('token', `${json.email}`));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email === '' || data.password === '' || data.username === '') {
      setCheck(false);
      return;
    } else {
      setCheck(true);
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
      {check ? '' : <p className="text-danger">все поля обязательны для заполнения</p>}
    </form>
  );
};

export default RegisterForm;
