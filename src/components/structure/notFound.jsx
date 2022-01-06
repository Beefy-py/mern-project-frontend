import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found">
      <h1>404 Error</h1>
      <p>
        I beg your pardon 🧐. The URL you are trying to access was incorrect /
        does not exist.
      </p>{" "}
      <Link to="/home">back home</Link>
    </section>
  );
};

export default NotFound;
