import axios from "axios";

export const getData = () => async (dispatch) => {
  const { data } = await axios.get("https://my-social-media-app-chouaib.herokuapp.com");
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
  const { data } = await axios.post("https://my-social-media-app-chouaib.herokuapp.com", form);
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
    const { data } = await axios.patch(`https://my-social-media-app-chouaib.herokuapp.com/${id}`, form);
    dispatch({
      type: "UpdateData",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  await axios.delete(`https://my-social-media-app-chouaib.herokuapp.com/${id}`);
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
  const { data } = await axios.patch(`https://my-social-media-app-chouaib.herokuapp.com/${id}/likepost`)
  dispatch({
    type: "likeData",
    payload: data,
  });
  
} catch (error) {
  console.log(error);

}

}


