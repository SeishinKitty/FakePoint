import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Modal from "./Modal";

const Layout = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="header">
        <h1>FakePoint</h1>
      </div>

      <div className="ribbon">
        <button className="ribbon-button">Nothing Button</button>
        <button className="ribbon-button"  onClick={(event: any) => {setShow(true)}}>Ligma</button>
        <button className="ribbon-button">Goat</button>
      </div>

      <div className="nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "link-active" : "link")}>Home</NavLink>
        <NavLink to="/List" className={({ isActive }) => (isActive ? "link-active" : "link")}>List</NavLink>
        <NavLink to="/ListRelated" className={({ isActive }) => (isActive ? "link-active" : "link")}>ListRelated</NavLink>
      </div>

      <div className="contents">
        <Outlet />
      </div>

      <Modal show={show} setShow={setShow} />
    </>
  )
};

export default Layout;
