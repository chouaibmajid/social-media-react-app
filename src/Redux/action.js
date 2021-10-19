import axios from "axios";

export const getData = () => async (dispatch) => {
  const { data } = await axios.get("http://localhost:5000");
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
  const { data } = await axios.post("http://localhost:5000", form);
  try {
    dispatch({
      type: "PostData",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateData = (id,form) => async (dispatch) => {
  
  try {
    const { data } = await axios.patch(`http://localhost:5000/${id}`, form);
    dispatch({
      type: "UpdateData",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5000/${id}`);
  try {
    dispatch({
      type: "deletePost",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async(dispatch) => {
try {
  const { data } = await axios.patch(`http://localhost:5000/${id}/likepost`)
  dispatch({
    type: "likeData",
    payload: data,
  });
  
} catch (error) {
  console.log(error);

}

}


