/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react';
import TextField from '../form/textFiled';

const RegisterForm = ({ authStatus, onChangeAuth }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    username: '',
    lastLoginDate: '',
    registrDate: '',
  });
  const [check, setCheck] = React.useState(true);
  // let status = false;
  const [status, setStatus] = React.useState(false);
  const handleChange = (target) => {
    const dateNow = Date().toString().substring(4, 24);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
      ['lastLoginDate']: dateNow,
      ['registrDate']: dateNow,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email === '' || data.password === '' || data.username === '') {
      setCheck(false);
      return;
    } else {
      setCheck(true);
    }

    // fetch('http://localhost:5000/auth/registration', {
    fetch('https://jsonplaceholder.typicode.com/posts', {
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
      .then((response) => response.json())
      .then((json) => localStorage.setItem('token', `${json.email}`));
  };
  if (status) {
    onChangeAuth(true);
  }
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
