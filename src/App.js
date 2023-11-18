import "./App.css";
import { useEffect, useState } from "react";

//import { logIn, logOut } from "./Api";
// change API to using firebase
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
// in order to use firebase api, we need to initilize it first

const firebaseConfig = {
  apiKey: "AIzaSyC9l-HGkguNIrsmo3MpTlrm42pIJxbuBLI",
  authDomain: "reactauthprj-2d738.firebaseapp.com",
  projectId: "reactauthprj-2d738",
  storageBucket: "reactauthprj-2d738.appspot.com",
  messagingSenderId: "718990212727",
  appId: "1:718990212727:web:a81a2f5f9d87fce49ed072",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//now we can adapt logIn function to use firebase
//be aware of the account in firebase is an Email
function logIn(account, password) {
  return signInWithEmailAndPassword(auth, account, password);
}
function logOut() {
  return signOut(auth);
}

//Then we can login with firebase account( we didn't implement signup functionality, so we need to add some account in firebase)

//these code works, but firebase recommended an aternative way to do it
//https://firebase.google.com/docs/auth/web/manage-users
// it sets an observer on Auth object

// think about where to put it, obvisously while all the components amounted, so we useEffect

function App() {
  const [account, setAccount] = useState("user");
  const [password, setPassword] = useState("password");
  const [user, setUser] = useState(null);
  async function handleLogin() {
    console.log("handleLogin");
    try {
      const credential = await logIn(account, password);
      console.log(credential);
      setUser(credential.user);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  async function handleLogOut() {
    await logOut();
    setUser(null);
  }
  /*
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
      //since we gets user when user is signed in, and get null when user is signed out
      //it is the ideal value for our user value, why not call setUser directly
      setUser(user);
    });
  }, []);*/
  return (
    <div className="App">
      <h1> THis content is for everyone</h1>
      {user && (
        <>
          <h1>This content only loged use can see it</h1>
          <h2>welcome:{user.name}</h2>
          <p>email:{user.email}</p>
          <p>role:{user.role}</p>

          <button onClick={handleLogOut}>logout</button>
        </>
      )}
      {!user && (
        <div
          style={{
            margin: "auto",
            width: "50%",
            height: "300px",
            border: "3px solid green",
          }}
        >
          <input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          ></input>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={handleLogin}>login</button>
        </div>
      )}
    </div>
  );
}

export default App;
