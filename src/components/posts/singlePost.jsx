import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { likePost, dislikePost, deletePost } from "../../actions/posts";

import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";

const SinglePost = ({
  postId,
  image,
  title,
  author,
  message,
  tags,
  likes,
  dislikes,
  moment: momentPostCreated,
  setCurrentId,
  scrollToForm,
  setFormShow,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("profile"));

  const [visible, setVisible] = useState(false);

  const options = { root: null, rootMargin: "0px", threshold: 0.05 };

  const callBackFunction = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
  };

  const handleActionClick = (e) => {
    const action = e.target.getAttribute("data-name");

    if (action === "edit") {
      setFormShow(true);
      scrollToForm();
      setCurrentId(postId);
    }

    if (action === "delete") {
      dispatch(deletePost(postId));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFunction, options);
    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [cardRef, options]);

  const popover = (
    <Popover id="popover-delete">
      <Popover.Body>
        <h5> Are you sure you want to delete this post?</h5>
        <Button variant="outline-secondary">No</Button>{" "}
        <Button
          variant="outline-danger"
          data-name="delete"
          onClick={handleActionClick}
        >
          Yes
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={`post ${visible && "visible"}`} ref={cardRef}>
      {image && (
        <div className="head">
          <img
            src={image}
            alt={"image for: " + title}
            onClick={() => navigate(`/posts/${postId}`)}
          />
        </div>
      )}

      {author.id === currentUser?.result._id && (
        <div className="actions">
          <button onClick={handleActionClick} data-name="edit">
            Edit
            {/* <i className="fas fa-edit"></i> */}
          </button>

          <OverlayTrigger
            trigger="click"
            placement="bottom-start"
            overlay={popover}
          >
            <button data-name="delete">
              Delete
              {/* <i className="fas fa-trash-alt"></i> */}
            </button>
          </OverlayTrigger>
        </div>
      )}

      <div className="body">
        <h2 onClick={() => navigate(`/posts/${postId}`)}>{title}</h2>

        <div className="tags">
          {tags.map((tag, tag_id) => (
            <span key={tag_id} className="tag">
              {`#${tag}`}
            </span>
          ))}
        </div>

        <div className="post-info">
          <p className="author">{author.name} </p>
          <p>{momentPostCreated}</p>
        </div>

        <p className="message">
          {message?.replace(/\s/g, "").length > 400 ? (
            <>
              {message.substring(0, Math.floor(0.5 * message.length)) + "..."}{" "}
              <Link to={"/posts/" + postId}>read more</Link>
            </>
          ) : (
            message
          )}
        </p>
        <div className={`reactions ${!currentUser && "not-allowed"}`}>
          <div className="vote">
            <i
              className={`${
                likes.includes(currentUser?.result?._id) ? "fas" : "far"
              } fa-thumbs-up`}
              onClick={() => dispatch(likePost(postId))}
            ></i>
            <span> {likes.length}</span>

            <i
              className={`${
                dislikes.includes(currentUser?.result?._id) ? "fas" : "far"
              } fa-thumbs-down`}
              onClick={() => dispatch(dislikePost(postId))}
            ></i>
            <span> {dislikes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
