import React, { useState, useEffect } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // state of input
  const [info, setInfo] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",
  });

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfo({ ...info, [name]: value });
  };

  // form submit
  const formSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, address, desc } = info;

    const res = await fetch(`http://localhost:4000/api/v1/update-user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        address,
        desc,
      }),
    });

    const mainData = await res.json();
    console.log(mainData);

    if (res.status === 400 || !mainData) {
      alert("Please fill the data");
    } else {
      alert("Update data added successfully");
      navigate("/");
    }
  };

  // get data from db 👍 [ first of all must be needed user data from db then update 💯]

  const getIndividualUser = async () => {
    const res = await fetch(`http://localhost:4000/api/v1/single/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // convert data to json
    const data = await res.json();
    console.log(data);

    if (!data || res.status === 400) {
      console.log("Failed to get single user");
    } else {
      console.log("single user found successfully!");
      setInfo(data.singleUser);
    }
  };

  useEffect(() => {
    getIndividualUser();
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="text-center">
          <h2 className="text-info ">Edit Page</h2>
        </div>
        <div className="row">
          <div className="col-xl-8 mx-auto">
            <Form onSubmit={formSubmit}>
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={info.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={info.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    name="age"
                    type="number"
                    value={info.age}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile"
                    value={info.mobile}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="work">
                  <Form.Label>Work</Form.Label>
                  <Form.Control
                    name="work"
                    type="text"
                    value={info.work}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    type="address"
                    value={info.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="5"
                    name="desc"
                    value={info.desc}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
