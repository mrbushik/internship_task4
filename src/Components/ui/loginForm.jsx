/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import TextField from '../form/textFiled';
function LoginForm() {
  const [data, setData] = React.useState({
    email: '',
    name: '',
    password: '',
    lastLoginDate: '',
  });
  const [check, setCheck] = React.useState(true);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateNow = Date().toString().substring(4, 24);
    handleChange({ name: 'lastLoginDate', value: dateNow });
    // setData((prevState) => ({ ...prevState, ['lastLoginDate']: dateNow }));
    if (data.email === '' || data.name === '' || data.password === '') {
      setCheck(false);
      return;
    } else {
      setCheck(true);

      console.log(data);
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
}

export default LoginForm;
