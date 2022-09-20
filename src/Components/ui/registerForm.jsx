/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import TextField from '../form/textFiled';
import Login from '../page/login';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    lastLoginDate: '',
    registerDate: '',
  });
  const [check, setCheck] = React.useState(true);

  const handleChange = (target) => {
    console.log(target);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email === '' || data.password === '' || data.name === '') {
      setCheck(false);
      return;
    } else {
      setCheck(true);
      const dateNow = Date().toString().substring(4, 24);
      handleChange({ name: 'lastLoginDate', value: dateNow });
      //   setData((prevState) => ({
      //     ...prevState,
      //     [data.lastLoginDate]: dateNow,
      //     [data.registerDate]: dateNow,
      //   }));
      //   setData((prevState) => ({ ...prevState, email: 333 }));
    }
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <TextField label="Имя" name="name" value={data.name} onChange={handleChange} />

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
