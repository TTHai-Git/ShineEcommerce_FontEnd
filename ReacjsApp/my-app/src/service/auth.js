// Import the necessary functions
import { auth } from "../Config/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";

// Function for social media authentication
const socialMediaAuth = (provider) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user;
    })
    .catch((er) => {
      return er;
    });
};

export default socialMediaAuth;
