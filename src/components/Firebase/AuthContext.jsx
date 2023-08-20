import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [User, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const Cuser = auth.currentUser;

  async function signup(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email Verification Send")
          alert("Email Verification Send")
        });
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message, error.code);
        alert(error.message);
      });
  }

  async function EmailVerfication(value){
    return await sendEmailVerification(value).then(() => {
      console.log("Email Verification Send")
      alert("Email Verification Send")
    });
  }
  async function deltAccount() {
    return await deleteUser(Cuser)
      .then(() => {
        alert("Account Deleted");
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  }

  async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified !== true) {
          userCredential.user.delete();
          alert("User wasnt Authenticated hence, Account was deleted")
        } else {
          setUser(userCredential.user);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function logout() {
    return signOut(auth);
  }

  function PasswordUpdate(password) {
    return  updatePassword(Cuser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setLoading(false);
    });
    if (Cuser !== null) {
      setUser(Cuser);
    } else setUser(false);
    return unsubscribe;
  }, []);

  const value = {
    User,
    login,
    signup,
    logout,
    PasswordUpdate,
    deltAccount,
    EmailVerfication
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
