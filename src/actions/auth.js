import {
  AUTH,
  FETCH_USERS,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import * as api from "../api/index";

export const registerUser = (userFields, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(userFields);
    dispatch({ type: AUTH, data });

    navigate("/home");
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = (userFields, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(userFields);
    dispatch({ type: AUTH, data });

    navigate("/home");
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchUsers();

    dispatch({ type: FETCH_USERS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};
