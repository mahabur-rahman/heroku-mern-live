import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
// react icon
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handlePushOnRegister = () => {
    navigate("/register");
  };

  // get data from db 👍
  const getData = async () => {
    const res = await fetch(`http://localhost:4000/api/v1/get-alluser`, {
      method: "GET",
      "Content-Type": "application/json",
    });

    const data = await res.json();

    if (!data || res.status === 404) {
      console.log("User not found");
    } else {
      console.log("user found successfully");
      setUsers(data.allUsers);
    }
  };
  // console.log(users);

  // delete users from db
  const deletedUser = async (id) => {
    const res = await fetch(`http://localhost:4000/api/v1/deletedUser/${id}`, {
      method: "DELETE",
      "Content-Type": "application/json",
    });

    const data = await res.json();
    console.log(data);

    if (!data || res.status === 400) {
      console.log("Failed!");
    } else {
      getData();
      console.log("User deleted successfully!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="text-end mb-4">
          <button className="btn btn-primary" onClick={handlePushOnRegister}>
            + Add Data
          </button>
        </div>

        {/* table start */}
        <Table striped bordered hover>
          <thead className="bg-dark text-light">
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, ind) => {
              const { _id, name, email, work, mobile } = user;
              return (
                <tr key={_id}>
                  <td>{ind + 1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{work}</td>
                  <td>{mobile}</td>
                  <td>
                    <Link to={`/view/${_id}`} className="text-success">
                      <FaEye />
                    </Link>
                    <Link to={`/edit/${_id}`} className="text-warning mx-3">
                      <FaRegEdit />
                    </Link>
                    <button
                      className="text-danger border-0"
                      onClick={() => deletedUser(_id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Home;
