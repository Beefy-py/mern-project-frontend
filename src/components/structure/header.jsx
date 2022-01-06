import React, { useState, useEffect } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
  const screenSM = Boolean(window.innerWidth <= 780);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");

    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        console.log("Token Expired");
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const isOnPostDetail = Boolean(
    window.location.pathname
      .split("/")
      .pop()
      .match(/[a-f0-9]{24}/)
  );

  const username = user ? user.result.name : null;

  const displayAccount = () => {
    if (screenSM)
      return (
        <React.Fragment>
          {user ? (
            <React.Fragment>
              <Dropdown.Item className="username">{username}</Dropdown.Item>
              <div className={user && "user-options-sm"}>
                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                <Dropdown.Item onClick={logout} className="logout-btn">
                  Logout
                </Dropdown.Item>
              </div>
            </React.Fragment>
          ) : (
            <div className={user && "user-options-sm"}>
              <Dropdown.Item href="/auth">Sign In</Dropdown.Item>
            </div>
          )}
        </React.Fragment>
      );
    return (
      <div className="auth-nav">
        {user ? (
          <DropdownButton
            align="end"
            title={username}
            id="dropdown-menu-align-end"
          >
            <Dropdown.Item href="/home">Dashboard</Dropdown.Item>
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item onClick={logout} className="logout-btn">
              Logout
            </Dropdown.Item>
          </DropdownButton>
        ) : (
          <div className="auth-btns">
            <Link to="/auth">Sign In</Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <header>
      <nav>
        <h1>Poster</h1>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>

        {!screenSM && displayAccount()}

        {screenSM && (
          <DropdownButton
            id="dropdown-basic-button"
            title={
              show ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-bars"></i>
              )
            }
            onClick={() => setShow(!show)}
          >
            <Dropdown.Item href="/home">Home</Dropdown.Item>
            <Dropdown.Item href="/about">About</Dropdown.Item>
            <Dropdown.Item href="/posts">Posts</Dropdown.Item>
            <Dropdown.Divider />
            {displayAccount()}
          </DropdownButton>
        )}
      </nav>
    </header>
  );
};

export default Header;
