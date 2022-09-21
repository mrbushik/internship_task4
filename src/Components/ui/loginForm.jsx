/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import TextField from '../form/textFiled';
function LoginForm({ onChangeAuth }) {
  const [data, setData] = React.useState({
    username: '',
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
    await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(function (response) {
        setStatus(response.ok);
        return response;
      })
      .then((response) => response.json())
      .then((json) =>
        json.token
          ? localStorage.setItem('token', `${json.token}`) && console.log(json.token)
          : console.log('uncorrect'),
      );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username === '' || data.password === '') {
      setCheck(false);
      return;
    } else {
      setCheck(true);
      submitData();
      console.log(data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
}

export default LoginForm;
