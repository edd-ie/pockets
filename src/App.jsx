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

  useEffect(() => {
    fetch("https://pockets.onrender.com/me")
    .then(res => res.json())
    .then(data => {
      console.log("file: App.jsx:20 -> useEffect -> data:", data);
      setUserId(data.id)})
  },[])

  const router = createBrowserRouter([
      {
        path: "/",
        element:<Dashboard user={userId}/>
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
        element: <SignUp/> 
      },
      {
        path: "/logIn",
        element: <LogIn serWebState={()=>setWebState}/> 
      }

    ]
  );

  return (
    <div>
      {!user&& <LogIn serWebState={()=>setWebState}/>}
      {user && <RouterProvider router={router}/>}
    </div>
  )
}

export default App
