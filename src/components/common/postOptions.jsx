import { ClickAwayListener } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/posts";

export default function PostOptionsMenu({
  setCurrentId,
  postId,
  scrollToForm,
  setFormShow,
}) {
  const [showMenu, setShowMenu] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    const action = e.target.getAttribute("data-name");

    if (action === "edit") {
      setFormShow(true);
      scrollToForm();
      setCurrentId(postId);
    }

    if (action === "delete") {
      dispatch(deletePost(postId));
    }

    setShowMenu(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowMenu(false)}>
      <div className="options-menu">
        <button className="options-btn" onClick={() => setShowMenu(!showMenu)}>
          Options{" "}
          {showMenu ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}{" "}
        </button>
        {showMenu && (
          <div className="items">
            <button onClick={handleClose} data-name="edit">
              Edit
            </button>
            <button onClick={handleClose} data-name="delete">
              Delete
            </button>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
