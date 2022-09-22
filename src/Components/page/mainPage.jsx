import React from 'react';
import axios from 'axios';
import UsersList from '../ui/usersList';

function MainPage() {
  const [userslist, setUsersList] = React.useState();
  React.useEffect(() => {
    handleRequest();
  }, []);
  const handleUpdateUsers = () => {
    handleRequest();
  };
  const handleRequest = () => {
    fetch('https://task4-2cc24-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .then((response) => response.json())
      .then((json) => setUsersList(json));
  };

  return <>{userslist && <UsersList listOfUsers={userslist} onUpdate={handleUpdateUsers} />}</>;
}

export default MainPage;
