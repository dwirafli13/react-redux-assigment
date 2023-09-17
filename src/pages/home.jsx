import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "../redux/slice/userListSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { userData, status, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error : {error}</div>;
  }
  return (
    <div className="container">
      <h1>User Data</h1>
      {userData && (
        <div>
          {userData.map((item, key) => (
            <div key={key}>
              <img src={item.avatar} alt="User Avatar" />
              <p>
                Name: {item.first_name} {item.last_name}
              </p>
              <p>Email: {item.email}</p>
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
