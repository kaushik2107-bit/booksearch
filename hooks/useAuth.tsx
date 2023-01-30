import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

interface IAuth {
  user: User | null;
  login: () => Promise<void>;
  error: string | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuth>({
  user: null,
  login: async () => {},
  error: null,
  loading: false,
  logout: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/");
      }
      setInitialLoading(false);
    });
  }, [auth]);

  const createUser = async (user: User) => {
    try {
      const colRef = collection(db, "userInfo");
      const resource = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
      };

      const q = query(colRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      let docs: DocumentData = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      if (docs.length) return;
      await setDoc(doc(colRef, user.uid), resource);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    console.log("Hello");
    await signInWithPopup(auth, googleAuth)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/channels");
        createUser(userCredential.user);
        setLoading(false);
      })
      .catch((err) => (setError(err.message), alert(err.message)))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => (setError(err.message), alert(err.message)))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      login,
      error,
      loading,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
