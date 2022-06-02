import React from "react";
// style
import "./index.scss";
// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// react router dom
import { Routes, Route } from "react-router-dom";
// component
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Edit from "./components/Edit";
import View from "./components/View";

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </div>
  );
};

export default App;
