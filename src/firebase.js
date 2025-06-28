import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_iETxoq-NyqChaF7gDOnj-id_wVlis18",
  authDomain: "expenses-auth-7b652.firebaseapp.com",
  projectId: "expenses-auth-7b652",
  storageBucket: "expenses-auth-7b652.firebasestorage.app",
  messagingSenderId: "142061498204",
  appId: "1:142061498204:web:128d5f8223d48c2f061b99",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
