import {
  FETCH_ALL,
  FETCH_ONE,
  CREATE,
  UPDATE,
  DELETE,
  FILTER_OLDEST,
  FILTER_MOST_LIKED,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export default (state = { posts: [], isLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      const { currentPage, numberOfPages } = action.payload;
      return {
        ...state,
        posts: action.payload.data,
        currentPage: currentPage,
        numberOfPages: numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case FETCH_ONE:
      return { ...state, post: action.payload };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case FILTER_OLDEST:
      console.log("OLDEST! now");
      return state.sort((p1, p2) => p1.createdAt < p2.createdAt);

    case FILTER_MOST_LIKED:
      console.log("most likes! now");
      return state.sort((p1, p2) => p1.likeCount < p2.likeCount);

    default:
      return state;
  }
};
