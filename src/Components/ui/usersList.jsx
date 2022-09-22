/* eslint-disable no-useless-computed-key */
import React from 'react';
import User from './user';

function UsersList({ listOfUsers }) {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const getSelectUsers = (id, checkboxNumber, check) => {
    // console.log(selectedUsers);
    // console.log('index' + checkboxNumber);
    let testArr = selectedUsers;
    if (!check) {
      setSelectedUsers((selectedUsers) => [...selectedUsers, id]);
    } else {
      testArr.splice(checkboxNumber, 1);
      //   console.log(testArr);
      setSelectedUsers((selectedUsers) => [...testArr]);
    }

    // let checkedId = selectedUsers.find((item) => item === id);
    // if (checkedId !== -1) {
    //   console.log(checkedId);
    //   setSelectedUsers((selectedUsers) => [...selectedUsers.slice(checkedId, 1)]);
    // } else {
    //   setSelectedUsers((selectedUsers) => [...selectedUsers, id]);
    // }
  };
  return (
    <>
      <button type="button" className="btn btn-danger m-2">
        Delete
      </button>
      <button type="button" className="btn btn-success m-2">
        Unblock
      </button>
      <button type="button" className="btn btn-warning m-2">
        block
      </button>
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
                key={user._id}
                {...user}
                userObjectId={Object.keys(listOfUsers)[index]}
                onSelect={getSelectUsers}
                sequenceNumber={index}
              />
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}

export default UsersList;
