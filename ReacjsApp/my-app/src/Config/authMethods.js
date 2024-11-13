// Import the auth instance and provider classes
import { auth } from "../Config/FirebaseConfig";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

// Create instances of each provider
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();
