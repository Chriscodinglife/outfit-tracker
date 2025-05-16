import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";

export default function Login() {
  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-4 text-black">
        Outfit Tracker 👚
      </h1>
      <button
        onClick={signIn}
        className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
