import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import moment from "moment";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentsRef = useRef();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = (e) => {
    e.preventDefault();
    const finalComment = {
      authorId: user.result._id,
      authorName: user.result.username,
      body: comment,
    };
    setComments((prevState) => [...prevState, finalComment]);
    dispatch(commentPost(finalComment, post._id));

    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="comment-section">
      <h2>Comment Section</h2>{" "}
      {user?.result && (
        <div className="comment-form">
          <form action="" onSubmit={handleClick}>
            <textarea
              type="text"
              placeholder="Type Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <input onClick={handleClick} type="submit" />
          </form>
        </div>
      )}
      <div className="comments">
        {comments.map((c, i) => (
          <div key={i} className="comment">
            <div className="title">
              <span> {c.authorName} </span>
              <span> {moment(c.commentedAt).fromNow()}</span>
            </div>
            <div className="text">{c.body}</div>
          </div>
        ))}
        <div ref={commentsRef}></div>
      </div>
    </div>
  );
};

export default CommentSection;
