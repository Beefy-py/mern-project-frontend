import React, { useEffect, useState } from "react";

import { getSinglePost, getPostsBySearch } from "../../actions/posts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LinearProgress from "@mui/material/LinearProgress";
import moment from "moment";
import _ from "lodash";
import CommentSection from "./commentSection";

const SinglePostDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { posts, post, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: null, tags: post?.tags.join(",") }));
    }
  }, [post]);

  console.log("posts loading: ", isLoading);

  if (isLoading) {
    return (
      <div className="post-loading loading-container">
        <h5>loading the post...</h5>
        <LinearProgress />
      </div>
    );
  }

  if (!post) {
    // navigate("/post-not-found");
    return "nothing here";
  } else {
    const image =
      post.selectedFile || "https://source.unsplash.com/random/1200";

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
    return (
      <>
        <div className="single-post">
          <section>
            <div className="header">
              {/* <img src={post.selectedFile} alt={"Image for " + post.title} /> */}

              <h4>post by </h4>
              <h3>{post.authorName}</h3>
            </div>
          </section>

          <section>
            <h3
              style={{
                backgroundImage: `url(${image})`,
              }}
              className="title-img"
            >
              <div className="overlay"></div>
              <p className="post-title">{post.title}</p>
            </h3>
          </section>

          <section>
            <div className="body">
              <div className="info">
                <div className="time">
                  <span>
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "long",
                      timeStyle: "short",
                    }).format(new Date(post.createdAt))}
                  </span>
                  <span> {moment(post.createdAt).fromNow()}</span>
                </div>
                <div className="likes">
                  <span style={{ marginRight: "1rem" }}>
                    <b>Likes</b> <span>{post.likes.length}</span>
                  </span>
                  <span>
                    <b>Dislikes</b>
                    <span> {post.dislikes.length}</span>
                  </span>
                </div>
                <div className="tags">
                  {post.tags.map((tag, tag_id) => (
                    <span key={tag_id} className="tag">
                      {`#${tag}`}
                    </span>
                  ))}
                </div>
                <div className="actions"></div>
              </div>
              <p className="text"> {post.message}</p>
            </div>
          </section>
        </div>
        <CommentSection post={post} />
        {recommendedPosts.length && (
          <section className="recommended-posts">
            <h2>You might also like</h2>
            <div className="posts">
              {_.shuffle(recommendedPosts)
                .splice(0, 3)
                .map((post) => (
                  <div className="post-card" key={post._id}>
                    <h3 onClick={() => navigate("/posts/" + post._id)}>
                      {post.title}
                    </h3>
                    <div className="info">
                      <span> {moment(post.createdAt).fromNow()}</span>
                      <span>
                        <span
                          style={{
                            color: "var(--success)",
                            marginRight: "0.5rem",
                          }}
                        >
                          {post.likes.length}{" "}
                          <i className="fas fa-thumbs-up"></i>
                        </span>
                        |
                        <span
                          style={{
                            color: "var(--danger)",
                            marginLeft: "0.5rem",
                          }}
                        >
                          {post.dislikes.length}
                          <i className="fas fa-thumbs-down"></i>
                        </span>
                      </span>
                    </div>
                    <div className="tags">
                      {post.tags.map((tag, tag_id) => (
                        <span key={tag_id} className="tag">
                          {`#${tag}`}
                        </span>
                      ))}
                    </div>
                    <p>
                      {post.message.substring(0, 200) + "..."}
                      <Link to={`/posts/${post._id}`}>read more</Link>
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </>
    );
  }
};

export default SinglePostDetail;
