import React from 'react';
import Login from './Components/page/login';
import MainPage from './Components/page/mainPage';

function App() {
  const [auth, setAuth] = React.useState(false);
  const handleToggleAuth = (state) => {
    setAuth(state);
  };
  return <>{auth ? <MainPage /> : <Login authStatus={auth} onChangeAuth={handleToggleAuth} />}</>;
}

export default App;
