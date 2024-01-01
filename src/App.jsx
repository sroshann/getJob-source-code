import Home from "./Pages/Home";
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

function App() {

  return (

    <div className="App">
      
      <Routes>

        <Route element={ <Home /> } path="/" />
        <Route element={ <LoginPage /> } path="login" />
        <Route element={ <SignupPage/> } path="signup" />

      </Routes>

    </div>

  );

}

export default App;
