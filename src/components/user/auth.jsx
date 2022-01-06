import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser, loginUser } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      dispatch(registerUser(formData, navigate));
    } else {
      dispatch(loginUser(formData, navigate));
    }
  };

  const handleChange = (e) => {
    const field = e.target;
    if (field.name === "firstName" || field.name === "lastName") {
      setFormData({
        ...formData,
        [field.name]:
          field.value.charAt(0).toUpperCase() + field.value.slice(1),
      });
    } else {
      setFormData({ ...formData, [field.name]: field.value });
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = () => {
    console.error("Sign in with Google Failed.");
  };

  const clientId =
    "28667066073-gd4rt674pmtpofivadiaintje2iqvo2s.apps.googleusercontent.com";

  return (
    <section className="auth-section">
      <h1>{isRegister ? "Account Register" : "Account LogIn"}</h1>

      <Form
        onSubmit={handleSubmit}
        className={isRegister ? "register-form" : "login-form"}
      >
        {isRegister && (
          <React.Fragment>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Enter first name"
                name="firstName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Enter last name"
                name="lastName"
              />
            </Form.Group>
          </React.Fragment>
        )}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
            name="email"
          />
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        {isRegister && (
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="username"
              placeholder="Enter @username"
              name="username"
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>

        {isRegister && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              placeholder="Re-enter Password"
              name="confirmPassword"
            />
          </Form.Group>
        )}
        <div className="submit-btns">
          <button type="submit">{isRegister ? "Register" : "Log In"}</button>

          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="google-btn third-party-btn"
              >
                <i className="fab fa-google"></i>
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>

        <Form.Text className="text-muted">
          {isRegister ? (
            <>
              Already have an account?
              <button type="button" onClick={() => setIsRegister(false)}>
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?
              <button type="button" onClick={() => setIsRegister(true)}>
                Register
              </button>
            </>
          )}
        </Form.Text>
      </Form>
    </section>
  );
};

export default Auth;
