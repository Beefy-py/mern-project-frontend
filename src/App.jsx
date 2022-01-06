import React, { useEffect, useState } from "react";

import Header from "./components/structure/header";

import { getPosts } from "./actions/posts";
import { getComments } from "./actions/comments";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainContent from "./components/structure/mainContent";
import NotFound from "./components/structure/notFound";
import About from "./components/structure/about";
import Dashboard from "./components/structure/dashboard";
import Auth from "./components/user/auth";
import SinglePostDetail from "./components/posts/singlePostDetail";
import UserList from "./components/user/userList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("getting posts");
    dispatch(getPosts());

    console.log("getting comments");
    dispatch(getComments());
  }, [dispatch, window.location]);

  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>

      <Routes>
        <Route path="/posts" element={<MainContent />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="/posts/search" element={<MainContent />} />

        <Route
          path="/posts/:id"
          element={
            <PrivateRoute>
              <div className="post-container">
                <SinglePostDetail />
              </div>
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/users" element={<UserList />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

function PrivateRoute({ children }) {
  const authData = JSON.parse(localStorage.getItem("profile"));
  return authData.result._id ? children : <Navigate to="/auth" />;
}

export default App;
