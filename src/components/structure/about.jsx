import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about-page">
      <h1>About Poster-MERN</h1>
      <p>
        Poster MERN is pretty much a mern stack app created by{" "}
        <a
          target="_blank"
          href="https://www.upwork.com/freelancers/~012c0f16771fbabc61"
          rel="noreferrer"
        >
          Kenny Hoft
        </a>{" "}
        to test out his MERN development skills. On this website you can create
        posts, like, dislike and comment on them. You can only perform those
        actions if logged in.
      </p>
      <p>
        Users who bought <Link to="/premium">Premium</Link> get more control.
      </p>
    </section>
  );
};

export default About;
