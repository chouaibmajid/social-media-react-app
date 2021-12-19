import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profil")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profil")).token
    }`;
  }

  return req;
});
export const signup = (form, history) => async (dispatch) => {
  try {
    const { data } = await API.post("/signup", form);
    dispatch({
      type: "AUTH",
      payload: data,
    });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signin = (form, history) => async (dispatch) => {
  try {
    const { data } = await API.post("/signin", form);
    dispatch({
      type: "AUTH",
      payload: data,
    });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const getDataBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await API.get(`/posts/search?searchQuery=${search || "none"}`);
    dispatch({
      type: "FetchBySearch",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getData = (page) => async (dispatch) => {
  const { data } = await API.get(`/posts?page=${page}`);
  try {
    dispatch({
      type: "FetchData",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const PostDatas = (form) => async (dispatch) => {
  const { data } = await API.post("/posts", form);
  try {
    dispatch({
      type: "PostData",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateData = (id, form) => async (dispatch) => {
  try {
    const { data } = await API.patch(`/posts/${id}`, form);
    dispatch({
      type: "UpdateData",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  await API.delete(`/posts/${id}`);
  try {
    dispatch({
      type: "deletePost",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await API.patch(`/posts/${id}/likepost`);
    dispatch({
      type: "likeData",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
