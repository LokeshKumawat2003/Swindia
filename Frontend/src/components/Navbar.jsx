import React from "react";
import "../componentStyle/nav.css";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const profile = () => {
    navigate("/profile");
  };
  const home = () => {
    navigate("/");
  };
  const authToken = localStorage.getItem("authToken");

  return (
    <div>
      <nav>
        <div className="nav-box1">
          <div className="nav-logo">
            <span onClick={home}>Swindia.com</span>
          </div>
          <div className="nav-search-box">
            <input type="text" placeholder=" Search Some..." />
            <IoSearch />
          </div>
          {authToken ? (
            <div className="login" onClick={profile}>
              <span>Profile</span>
              <FaRegUserCircle />
            </div>
          ) : (
            <div className="login2" onClick={login}>
              <span>Login</span>
              <FaRegUserCircle />
            </div>
          )}
        </div>

        <div className="nav-box2">
          <div className="bar-box">
            <FaBars />
          </div>
          <div className="nav-logo2">
            <span onClick={home}>Swindia.com</span>
          </div>
          {authToken ? (
            <div className="login2" onClick={profile}>
              <span>profile</span>
              <FaRegUserCircle />
            </div>
          ) : (
            <div className="login2" onClick={login}>
              <span>Login</span>
              <FaRegUserCircle />
            </div>
          )}
        </div>
        <div className="serach2">
          <div className="nav-search-box search-box2">
            <input type="text" placeholder=" Search Some..." />
            <IoSearch />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
