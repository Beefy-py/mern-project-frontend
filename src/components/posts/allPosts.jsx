import React from "react";
import SinglePost from "./singlePost";
import Masonry from "react-masonry-css";
import LinearProgress from "@mui/material/LinearProgress";

import moment from "moment";
import { useSelector } from "react-redux";

const AllPosts = ({ setCurrentId, scrollToForm, setFormShow }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    800: 1,
  };

  if (!posts.length && !isLoading)
    return (
      <h4
        style={{
          color: "var(--accent-color)",
          background: "var(--primary-color)",
          padding: "1rem",
          width: "fit-content",
          margin: "2rem auto",
          borderRadius: "0.2rem",
          textAlign: "center",
          opacity: ".7",
        }}
      >
        No Posts At The Moment
      </h4>
    );

  return (
    <section className="all-posts">
      {!isLoading ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post, id) => {
            const {
              _id: postId,
              selectedFile,
              title,
              authorName,
              authorId,
              message,
              createdAt,
              tags,
              likes,
              dislikes,
            } = post;

            return (
              <SinglePost
                key={id}
                postId={postId}
                image={selectedFile}
                author={{ name: authorName, id: authorId }}
                title={title}
                message={message}
                likes={likes}
                dislikes={dislikes}
                date_added={new Date(createdAt)}
                moment={moment(createdAt).fromNow()}
                tags={tags}
                setCurrentId={setCurrentId}
                scrollToForm={scrollToForm}
                setFormShow={setFormShow}
              />
            );
          })}
        </Masonry>
      ) : (
        <div className="posts-loading loading-container">
          <h4 style={{ color: "var(--secondary-color)", fontSize: "1.1rem" }}>
            Loading Posts...
          </h4>
          <LinearProgress />
        </div>
      )}
    </section>
  );
};

export default AllPosts;
