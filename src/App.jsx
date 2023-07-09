import { useEffect, useState } from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Sims from './components/Sims';
import Cards from './components/Cards';
import Subscription from './components/Subscription';
import SignUp from './components/Signup';
import LogIn from './components/Login';
import Savings from './components/Savings';


function App() {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(1);
  console.log("file: App.jsx:15 -> App -> user:", user['id']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("file: App.jsx:16 -> App -> isLoggedIn:", isLoggedIn);

  useEffect(() => {
    fetch("https://pockets.onrender.com/me")
    .then(res => res.json())
    .then(data => {
      if (data.length > 0){
        setUser(data)
        setIsLoggedIn(true)
        setUserId(data['id'])
      }
    })    
  },[])

  const router = createBrowserRouter([
      {
        path: "/",
        element: <Dashboard userId={userId} onLogOff={(e)=>setUser(e)} setIsLoggedIn={(e)=>setIsLoggedIn(e)}/>
      },
      {
        path: "/sims",
        element: <Sims userID={userId}/>,
      },
      {
        path: "/cards",
        element: <Cards userID={userId}/>,
      },
      {
        path: "/savings",
        element: <Savings userID={userId}/>,
      },
      {
        path: "/subscription",
        element: <Subscription userId={userId} setUserData={(e)=>setUser(e)}/>
      },
      {
        path: "/login",
        element: <LogIn setUserData={(e)=>setUser(e)} webState={(e)=>setIsLoggedIn(e)}/>
      }
    ]
  );

  
  if (user.length > 0||isLoggedIn){
    return (<RouterProvider router={router}/> )
  
  }
  else{
    return (<LogIn setUserId={(e)=>setUserId(e)} setUserData={(e)=>setUser(e)} webState={(e)=>setIsLoggedIn(e)}/>)
  }
}

export default App
