import React, { useEffect, useState } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://backend-yqi9.onrender.com/api/getall"
      );
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`https://backend-yqi9.onrender.com/api/delete/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="userTable">
      <h2>MERN Full Stack Project</h2>
      <br />
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellSpacing={0} cellPadding={10}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.fname}
                  {user.lname}
                </td>
                <td>{user.email}</td>
                <td className="actionButtons">
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                  <Link to={`/edit/` + user._id}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default User;