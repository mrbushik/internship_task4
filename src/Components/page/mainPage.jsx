/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import UsersList from '../ui/usersList';

function MainPage({ onChangeAuth, userEmailValue }) {
  const pervUsersList = React.useRef('');
  const [userslist, setUsersList] = React.useState();
  React.useEffect(() => {
    pervUsersList.current = userslist;
    handleRequest();
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      handleRequest();
    }, 5000);
  }, []);

  const handleUpdateUsers = () => {
    handleRequest();
  };
  const handleRequest = () => {
    fetch('https://task4-2cc24-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .then((response) => response.json())
      .then((json) => setUsersList(json));
  };

  return (
    <>
      {userslist && (
        <UsersList
          userEmailValue={userEmailValue}
          onChangeAuth={onChangeAuth}
          listOfUsers={userslist}
          onUpdate={handleUpdateUsers}
        />
      )}
    </>
  );
}

export default MainPage;
