// Reducer with initial state handling
export const MyUserReducer = (current = null, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      return null;
    default:
      return current;
  }
};

// Logout function with error handling (if API logout is involved)
export const logOut = async (dispatch) => {
  try {
    // Perform any necessary API logout logic here, e.g., await api.logout();
    dispatch({ type: "logout" }); // Dispatch logout action
  } catch (error) {
    console.error("Logout failed:", error);
    // Handle logout error (optional)
  }
};
