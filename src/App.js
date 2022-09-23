import React from 'react';
import Login from './Components/page/login';
import MainPage from './Components/page/mainPage';

function App() {
  const [auth, setAuth] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('default');
  const handleToggleAuth = (state) => {
    setAuth(state);
  };
  const handleChange = (state) => {
    setUserEmail(state);
  };

  return (
    <>
      {/* <MainPage /> */}
      {auth ? (
        <MainPage userEmailValue={userEmail} onChangeAuth={handleToggleAuth} />
      ) : (
        <Login onEmail={handleChange} authStatus={auth} onChangeAuth={handleToggleAuth} />
      )}
    </>
  );
}

export default App;
