/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../ui/loginForm';
import RegisterForm from '../ui/registerForm';

function Login() {
  const { type } = useParams();
  const [formType, setFormType] = React.useState(type === 'register' ? type : 'login');
  const togleFormType = () => {
    setFormType((pervState) => (pervState === 'register' ? 'login' : 'register'));
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {formType === 'register' ? (
              <>
                <h3 className="mb-4">Register</h3>
                <RegisterForm />
                <p>Already have account?</p>{' '}
                <a role="button" onClick={togleFormType}>
                  Sing In
                </a>
              </>
            ) : (
              <>
                <h3 className="mb-4">Login</h3>
                <LoginForm />
                <a role="button" onClick={togleFormType}>
                  Sing Un
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
