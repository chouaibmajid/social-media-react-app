const initialState = {
  dataProfil: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profil", JSON.stringify(action.payload));
      return { ...state, dataProfil: action.payload };
    case "Logout":
        localStorage.clear();
      return { dataProfil: null };
  }
  return state;
};
