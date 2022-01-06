import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { likePost, dislikePost, deletePost } from "../../actions/posts";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

import moment from "moment";
import { createComment, deleteComment } from "../../actions/comments";
import { Link, useNavigate } from "react-router-dom";

const SinglePost = ({
  postId,
  image,
  title,
  author,
  message,
  date_added,
  tags,
  likes,
  dislikes,
  postComments,
  moment: momentPostCreated,
  setCurrentId,
  scrollToForm,
  setFormShow,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("profile"));

  const [showComments, setShowComments] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  const options = { root: null, rootMargin: "0px", threshold: 0.05 };

  const callBackFunction = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      body: comment,
      author: currentUser?.result?.name,
      postId: postId,
    };
    dispatch(createComment(newComment));

    setComment("");
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

          <div className="comment-section">
            <i
              className="far fa-comment"
              onClick={() => setShowComments(true)}
            ></i>

            <span className="comment-count">{postComments.length}</span>

            <Offcanvas
              show={showComments}
              onHide={() => setShowComments(false)}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  Comments Section: <b>{title}</b>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  {/* <Form.Label>write comment</Form.Label> */}
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={handleChange}
                    placeholder={"write a comment"}
                  />
                </Form.Group>
                <button type="submit">Submit</button>
              </Form>
              <Offcanvas.Body>
                {postComments.map((comment, index) => (
                  <Card className="comment" key={index}>
                    <Card.Header>
                      {comment.author}
                      <div className="actions">
                        {/* <button
                          onClick={() => handleCommentUpdate(comment._id)}
                        >
                          <i className="fas fa-edit"></i>
                        </button> */}
                        {comment.author === currentUser?.result?.name && (
                          <button
                            data-name="del-comment"
                            onClick={() => dispatch(deleteComment(comment._id))}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        )}
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p>{comment.body}</p>
                        <footer className="blockquote-footer">
                          {moment(comment.commentedAt).fromNow()}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Card>
                ))}
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
