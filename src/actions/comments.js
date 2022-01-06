import * as api from "../api";
import {
  FETCH_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from "../constants/actionTypes";

export const getComments = () => async (dispatch) => {
  try {
    const { data } = await api.getComments();
    dispatch({ type: FETCH_COMMENTS, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createComment = (comment) => async (dispatch) => {
  try {
    const { data } = await api.createComment(comment);
    dispatch({ type: CREATE_COMMENT, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateComment =
  (commentId, updatedComment) => async (dispatch) => {
    try {
      const { data } = await api.updateComment(commentId, updatedComment);
      dispatch({ type: UPDATE_COMMENT, payload: data });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    await api.deleteComment(commentId);
    dispatch({ type: DELETE_COMMENT, payload: commentId });
  } catch (err) {
    console.log(err);
  }
};
