/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import TextField from '../form/textFiled';
function LoginForm({ onChangeAuth, usersList }) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = React.useState(false);
  React.useEffect(() => {
    if (status) {
      onChangeAuth(true);
    }
  }, [status]);
  const [check, setCheck] = React.useState(true);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const submitData = async () => {
    let receivedUsers = Object.values(usersList).map((item) => item);
    let correctEmail = receivedUsers.find((item) => item.email === data.email);
    let correctPassword = receivedUsers.find((item) => item.password === data.password);
    if (correctEmail && correctPassword) {
      onChangeAuth(true);
    } else {
      setCheck(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username === '' || data.password === '') {
      setCheck(false);
      return;
    } else {
      setCheck(true);
      submitData();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField label="email" name="email" value={data.email} onChange={handleChange} />
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
      {check ? '' : <p className="text-danger">произошла ошибка заполните данные правильно</p>}
    </form>
  );
}

export default LoginForm;
