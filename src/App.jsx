import { useEffect, useState } from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Sims from './components/Sims';
import Cards from './components/Cards';
import Subscription from './components/Subscription';
import SignUp from './components/Signup';
import LogIn from './components/Login';


function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState([]);
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
        element: <Dashboard user={userId} onLogOff={(e)=>setUser(e)} setIsLoggedIn={(e)=>setIsLoggedIn(e)}/>
      },
      {
        path: "/sims",
        element: <Sims/>,
      },
      {
        path: "/cards",
        element: <Cards/>,
      },
      {
        path: "/subscription",
        element: <Subscription/>
      },
      {
        path: "/signUp",
        element: <SignUp user={()=>setUser} webState={()=>setIsLoggedIn}/> 
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
    return (<LogIn setUserData={(e)=>setUser(e)} webState={(e)=>setIsLoggedIn(e)}/>)
  }
}

export default App
