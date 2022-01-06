import axios from "axios";

const PRODUCTION = false;

const url = PRODUCTION
  ? "https://poster-mern.herokuapp.com"
  : "http://localhost:5000";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");

  if (profile)
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search/?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const fetchSinglePost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/react?like=1`);
export const dislikePost = (id) => API.patch(`/posts/${id}/react?like=0`);

export const getComments = () => API.get(`/comments`);
export const createComment = (newComment) => API.post(`/comments`, newComment);
export const updateComment = (id, comment) =>
  API.patch(`/comments/${id}`, comment);
export const deleteComment = (id) => API.delete(`/comments/${id}`);

export const fetchUsers = () => API.get("/users/user-list");
export const login = (formData) => API.post("/users/login", formData);
export const register = (formData) => API.post("/users/register", formData);
