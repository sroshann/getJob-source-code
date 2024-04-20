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
import Profile from "./Pages/Profile";
import PostJobPage from "./Pages/PostJobPage";
import SavedJobsPage from "./Pages/SavedJobsPage";
import ViewPage from "./Pages/ViewPage";
import AppliedJobsPage from "./Pages/AppliedJobsPage";
import PostedJobsPage from "./Pages/PostedJobsPage";
import ApplicantsList from "./Pages/ApplicantsList";
import ApplicantProfilePage from "./Pages/ApplicantProfilePage";

function App() {

  const { setUser } = useContext( AuthContext )

  useEffect( () => {

    onAuthStateChanged( FirebaseAuth , ( user ) => {

      setUser( user )

    } )

  } )

  return (

    <div classNameName="App">
      
      <Routes>

        <Route element={ <Home /> } path="/" />
        <Route element={ <LoginPage /> } path="login" />
        <Route element={ <SignupPage/> } path="signup" />
        <Route element={ <SeekerHome/> } path="seekerhome" />
        <Route element={ <EmployerHome/> } path="employerhome" />
        <Route element={ <Profile /> } path="profile" />
        <Route element={ <PostJobPage /> } path="postjob" />
        <Route element={ <SavedJobsPage/> } path="/saved" />
        <Route element={ <ViewPage /> } path='/view' />
        <Route element={ <AppliedJobsPage/> } path="/applied" />
        <Route element={ <PostedJobsPage /> } path="/posted" />
        <Route element={ <ApplicantsList /> } path="/applicants" />
        <Route element={ <ApplicantProfilePage /> } path="/applicant-profile" />

      </Routes>

    </div>

  );

}

export default App;
