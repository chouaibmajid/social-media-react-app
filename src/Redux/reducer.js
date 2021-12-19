const initialState = {
  Posts: [],
  currentPage:"",
  numberOfPages:""

};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "likeData": {
      const newArr = [...state.Posts];
      const index = newArr.findIndex((item) => item._id === action.payload._id);
      newArr.splice(index, 1, action.payload);
      return {
        ...state,
        Posts: newArr,
      };
    }
    case "deletePost": {
      const newArr = [...state.Posts].filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        Posts: newArr,
      };
    }
    case "UpdateData": {
      const newArr = [...state.Posts];
      const index = newArr.findIndex((item) => item._id === action.payload._id);
      newArr.splice(index, 1, action.payload);
      return {
        ...state,
        Posts: newArr,
      };
    }
    case "FetchData": {
      return {
        ...state,
        Posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    }
    
    case "FetchBySearch": {
      return {
        ...state,
        Posts: action.payload,
      };
    }
    case "PostData": {
      return {
        ...state,
        Posts: [...state.Posts, action.payload],
      };
    }

    default:
      return state;
  }
};
export default reducer;
