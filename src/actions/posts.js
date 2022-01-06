import * as api from "../api";
import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_ONE,
  CREATE,
  UPDATE,
  DELETE,
  FILTER_OLDEST,
  FILTER_MOST_LIKED,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export const getPosts =
  (page = "1") =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchPosts(page);

      dispatch({ type: FETCH_ALL, payload: data });
      dispatch({ type: END_LOADING });
    } catch (err) {
      console.log(err);
    }
  };

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getSinglePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSinglePost(postId);
    dispatch({ type: FETCH_ONE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (postId, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(postId, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
    dispatch({ type: DELETE, payload: postId });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(postId);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const dislikePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await api.dislikePost(postId);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const filterOldest = () => async (dispatch) => {
  return dispatch({ type: FILTER_OLDEST, payload: null });
};

export const filterMostLiked = () => async (dispatch) => {
  return dispatch({ type: FILTER_MOST_LIKED, payload: null });
};
