import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import axios from "axios"
import { useEffect,useState } from 'react';
import Home from './Pages/Home/Home';
import Login from './Pages/login/Login';
import Signup from './Pages/signup/Signup';
import "./App.css";

function App() {
  const [user , setUser]  = useState(null);
  const getUser = async()=>{
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const {data} = await axios.get(url,{withCredentials : true});
      setUser(data.user._json);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getUser(); 
  },[]);
  return (
    <div className="container">
      <Routes>
        <Route exact path='/' element = {user ? <Home user={user}/> : <Navigate to="/Login"/>} />
        <Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/signup"
					element={user ? <Navigate to="/" /> : <Signup />}
				/>
      </Routes>
    </div>
  );
}

export default App;
