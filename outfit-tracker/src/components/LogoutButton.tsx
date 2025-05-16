import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut(auth)}
      className="text-sm text-red-500 underline"
    >
      Logout
    </button>
  );
}
