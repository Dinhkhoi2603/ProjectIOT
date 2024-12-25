// src/UsersList.jsx
import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

const UsersList = () => {
  const [users, setUsers] = useState([]); // State lưu trữ dữ liệu users

  useEffect(() => {
    const usersRef = ref(database, "users"); // Tham chiếu đến nhánh "users"

    // Lắng nghe dữ liệu thay đổi
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Chuyển dữ liệu từ object thành array
        const usersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setUsers(usersArray);
      } else {
        setUsers([]); // Không có dữ liệu
      }
    });
  }, []);

  return (
    <div>
      <h1>Danh sách người dùng</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Tên:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Tuổi:</strong> {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
