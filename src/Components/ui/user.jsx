import React from 'react';

function User({
  _id,
  username,
  lastLoginDate,
  email,
  registrDate,
  statusUser,
  userObjectId,
  onSelect,
  sequenceNumber,
}) {
  const [check, setCheck] = React.useState(false);
  const handleChange = () => {
    setCheck(!check);
    onSelect(userObjectId, sequenceNumber, check);
  };
  return (
    <>
      <tr key={_id}>
        <th>
          <input type="checkbox" value="" onChange={handleChange} checked={check} />
        </th>
        <th>{userObjectId}</th>
        <th>{username}</th>
        <th>{email}</th>
        <th>{registrDate}</th>
        <th>{lastLoginDate}</th>
        <th>{statusUser}</th>
      </tr>
    </>
  );
}

export default User;
