import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./../../actions/auth";

import LinearProgress from "@mui/material/LinearProgress";

const UserList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.posts.isLoading);
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (isLoading) {
    return (
      <div className="user-page-loading loading-container">
        <h5>loading users...</h5>
        <LinearProgress />
      </div>
    );
  }

  console.log(users);
  return (
    <div className="user-list">
      <h2>List of all users</h2>
      {users.length &&
        users.map((user) => <div key={user._id}>{user.name}</div>)}
    </div>
  );
};

export default UserList;
