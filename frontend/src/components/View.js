import React, { useState, useEffect } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
// react bootstrap
import { Image } from "react-bootstrap";

// link : http://localhost:4000/api/v1/single/${id}

const ViewPage = () => {
  const navigate = useNavigate();

  const [uData, setUData] = useState({});

  const params = useParams();
  // console.log(params);
  const { id } = params;
  // console.log(id);

  // get single user data from db 👍
  const getSingleUser = async () => {
    const res = await fetch(`http://localhost:4000/api/v1/single/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // main data
    const data = await res.json();
    // console.log(data.singleUser._id);

    if (res.status === 400 || !data) {
      console.log("Invalid user");
    } else {
      console.log("User get successfully done ");
      setUData(data.singleUser);
    }
  };

  // console.log(uData);

  // delete user
  const deleteUser = async () => {
    const res = await fetch(`http://localhost:4000/api/v1/deletedUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);
    if (!data || res.status === 400) {
      console.log("Failed to delete user");
    } else {
      console.log("deleted successful!");
      navigate("/");
    }
  };

  // call this func 👍
  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-center">Welcome</h2>

        <hr />

        <div className="card">
          <div className="d-flex justify-content-center my-3">
            <Link to={`/edit/${id}`}>
              <FaRegEdit className="text-warning display-6" />
            </Link>
            <button className="border-0 bg-transparent" onClick={deleteUser}>
              <FaTrashAlt className="text-danger mx-3 display-6" />
            </button>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
            alt="Profile"
            fluid
          />
          <div className="card-body">
            <div className="d-flex">
              <div>
                <h4>Name : {uData.name}</h4>
                <h4>Age : {uData.age} </h4>
                <h4>Email : {uData.email} </h4>
                <h4>Work : {uData.work}</h4>
              </div>
              <div className="mx-5 px-5">
                <h4>Mobile : {uData.mobile} </h4>
                <h4>Location : {uData.address} </h4>
                <h4>Desc : {uData.desc} </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPage;
