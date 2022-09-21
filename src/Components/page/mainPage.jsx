import React from 'react';
import axios from 'axios';

function MainPage() {
  const [userslist, setUsersList] = React.useState();

  const hendleRequest = () => {
    fetch('http://localhost:5000/auth/users')
      .then((response) => response.json())
      .then((json) => setUsersList(json));
    // axios
    //   .get(
    //     // 'http://localhost:5000/auth/users',
    //     'https://jsonplaceholder.typicode.com/todos/1',
    //     {
    //       params: {
    //         username: 'john1904',
    //       },
    //     },
    //     // headers: {
    //     //   Authorization:
    //     //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjlkMmRhMzlmM2YwYzAyYTliZTI3MiIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNjYzNjg2MzcwLCJleHAiOjE2NjM3NzI3NzB9.YlsKy6Ny1fDbmdmpIvBjDl423qR6LWOfmxqmhSgNQXA',
    //     // },
    //   )
    //   .then((response) => response.json())
    //   .then((json) => console.log(json))
    //   .cath((e) => console.log(e));
  };
  return (
    <>
      <div onClick={hendleRequest}>MainPage</div>
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
        {userslist && (
          <tbody>
            {userslist.map((user) => (
              <tr key={user._id}>
                <th>
                  <input type="checkbox" />
                </th>
                <th>{user._id}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.lastLoginDate}</th>
                <th>{user.registrDate}</th>
                <th>{user.roles.join('')}</th>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}

export default MainPage;
