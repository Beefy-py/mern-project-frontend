import { AUTH, LOGOUT, FETCH_USERS } from "./../constants/actionTypes";

const authReducer = (state = { authData: null, users: [] }, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: [...action.payload] };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
