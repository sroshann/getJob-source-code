import Home from "./Pages/Home";
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import SeekerHome from "./Pages/SeekerHome";
import EmployerHome from "./Pages/EmployerHome";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/User";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "./FIrebase/Configueration";

function App() {

  const { setUser } = useContext( AuthContext )

  useEffect( () => {

    onAuthStateChanged( FirebaseAuth , ( user ) => {

      setUser( user )

    } )

  } )

  return (

    <div className="App">
      
      <Routes>

        <Route element={ <Home /> } path="/" />
        <Route element={ <LoginPage /> } path="login" />
        <Route element={ <SignupPage/> } path="signup" />
        <Route element={ <SeekerHome/> } path="seekerhome" />
        <Route element={ <EmployerHome/> } path="employerhome" />

      </Routes>

    </div>

  );

}

export default App;
