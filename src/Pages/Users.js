import axios from "axios";
import React from "react";
import GetUser from "../sharedCompo/GetUser";

const Users = () => {
  const [users] = GetUser();

  console.log(users);

  const handleMakeAdmin = async (id) => {
    await axios
      .put(`http://localhost:5000/api/users/isAdmin/${id}`, { isAdmin: true })
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mt-5">
        {users?.data?.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center border-2 border-purple-400 rounded-lg px-2 py-1 mb-1"
          >
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <button
              onClick={() => handleMakeAdmin(user._id)}
              disabled={user.isAdmin === true}
              className="border-2 border-purple-400 rounded-lg px-2 py-1"
            >
              {user.isAdmin === true ? "Yes" : "No"}
            </button>

            <button className="border-2 border-purple-400 rounded-lg px-2 py-1">
              del
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
