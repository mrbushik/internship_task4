/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React from 'react';
import User from './user';

function UsersList({ listOfUsers, onUpdate, onChangeAuth, userEmailValue }) {
  React.useEffect(() => {
    let receivedUsers = Object.values(listOfUsers).map((item) => item);
    let existenceEmail = receivedUsers.find((item) => item.email === userEmailValue);
    if (!existenceEmail) {
      onChangeAuth(false);
      return;
    }
    let existenceStatus = Object.values(existenceEmail).find((item) => item === 'BLOCK');

    if (!(existenceEmail && !existenceStatus)) {
      onChangeAuth(false);
    }
  }, [listOfUsers]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [highightCheckbox, setHighightCheckbox] = React.useState(false);
  const getSelectUsers = (id, checkboxNumber, check) => {
    let selectetIdArray = selectedUsers;
    if (!check) {
      setSelectedUsers((selectedUsers) => [...selectedUsers, id]);
    } else {
      let selectedItemId = selectetIdArray.findIndex((item) => item === id);
      selectetIdArray.splice(selectedItemId, 1);
      setSelectedUsers((selectedUsers) => [...selectetIdArray]);
    }
  };
  const updateData = async (id, method, giveStatus) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      statusUser: giveStatus,
    });

    let requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    let deleteRequestOptions = {
      method: method,
      redirect: 'follow',
    };

    await fetch(
      `https://task4-2cc24-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
      method === 'PATCH' ? requestOptions : deleteRequestOptions,
    )
      .then((response) => response.text())
      .then((result) => onUpdate())
      .catch((error) => console.log('error', error));
  };

  const handleBlock = () => {
    selectedUsers.map((item) => updateData(item, 'PATCH', 'BLOCK'));
  };
  const handleUnblock = () => {
    selectedUsers.map((item) => updateData(item, 'PATCH', 'USER'));
  };
  const handleDelete = () => {
    selectedUsers.map((item) => updateData(item, 'DELETE', ''));
    handleDeleteSelectedUsers();
  };
  const handleDeleteSelectedUsers = () => {
    setSelectedUsers([]);
  };
  const handleCheckbox = (condition) => {
    setHighightCheckbox(condition);
  };
  return (
    <>
      <button type="button" className="btn btn-danger m-2" onClick={handleDelete}>
        Delete
      </button>
      <button type="button" className="btn btn-success m-2" onClick={handleUnblock}>
        Unblock
      </button>
      <button type="button" className="btn btn-warning m-2" onClick={handleBlock}>
        block
      </button>
      <div className="btn btn-primary m-2" onClick={() => handleCheckbox(true)}>
        выделить всех
      </div>
      <div className="btn btn-secondary" onClick={() => handleCheckbox(false)}>
        отменить выделение
      </div>
      <div className="text-primary">
        Email авторизованного пользователя: {userEmailValue && userEmailValue}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">checkBox</th>
            <th scope="col">id</th>
            <th scope="col">user name</th>
            <th scope="col">email</th>
            <th scope="col">registration date</th>
            <th scope="col">last login date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {listOfUsers && (
          <tbody>
            {Object.values(listOfUsers).map((user, index) => (
              <User
                key={index + Object.keys(listOfUsers)[index]}
                {...user}
                userObjectId={Object.keys(listOfUsers)[index]}
                onSelect={getSelectUsers}
                sequenceNumber={index}
                onCheckbox={highightCheckbox}
                deleteSelectedUsers={handleDeleteSelectedUsers}
              />
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}

export default UsersList;
