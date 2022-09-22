import React from 'react';
import Login from './Components/page/login';
import MainPage from './Components/page/mainPage';

function App() {
  const [auth, setAuth] = React.useState(false);
  const [test, setTest] = React.useState(false);
  const handleToggleAuth = (state) => {
    setAuth(state);
  };
  // React.useEffect(() => {
  //   console.log('произошел auth');
  // }, [auth]);

  return (
    <>
      {/* <MainPage /> */}
      {auth ? <MainPage /> : <Login authStatus={auth} onChangeAuth={handleToggleAuth} />}
    </>
  );
}

export default App;
