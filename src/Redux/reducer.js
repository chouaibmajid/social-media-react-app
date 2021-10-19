const initialState = {
  Posts: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "likeData" : {
      const newArr = [...state.Posts];
      const index = newArr.findIndex((item) => item._id === action.payload._id);
      newArr.splice(index, 1, action.payload);
      return {
        Posts: newArr
      }
    }
    case "deletePost": {
      const newArr = [...state.Posts].filter(item => item._id !== action.payload)
      return {
        Posts: newArr,
      }
    }
    case "UpdateData": {
      const newArr = [...state.Posts];
      const index = newArr.findIndex((item) => item._id === action.payload._id);
      newArr.splice(index, 1, action.payload);
      return {
        Posts: newArr
      }
    }
    case "FetchData": {
      return {
        Posts: action.payload,
      };
    }
    case "PostData": {
      return {
        Posts: [...state.Posts, action.payload],
      };
    }

    default:
      return state;
  }
};
export default reducer;
