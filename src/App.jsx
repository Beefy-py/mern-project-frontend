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
  // const { authData } = useSelector((state) => state.auth);
  // console.log(authData);
  // console.log("can access post:", authData?.result._id);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  useEffect(() => {
    console.log("getting posts");
    dispatch(getPosts());

    console.log("getting comments");
    dispatch(getComments());

    console.log("setting currentUser");
    setCurrentUser(JSON.parse(localStorage.getItem("profile")));
  }, [dispatch, window.location]);

  return (
    <BrowserRouter>
      {currentUser?.result?._id && (
        <header>
          <Header />
        </header>
      )}

      <Routes>
        <Route path="/posts" element={<MainContent />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="/posts/search" element={<MainContent />} />

        <Route
          path="/posts/:id"
          element={
            !currentUser?.result?._id ? (
              <Auth />
            ) : (
              <div className="post-container">
                <SinglePostDetail />
              </div>
            )
          }
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/auth"
          element={currentUser?.result?._id ? <Navigate to="/" /> : <Auth />}
        />

        <Route
          path="/users"
          element={!currentUser?.result?._id ? <Auth /> : <UserList />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
