import { useState } from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Mobile from './components/Mobile';
import Cards from './components/Cards';
import Subscription from './components/Subscription';
import SignUp from './components/Signup';
import LogIn from './components/Login';


function App() {

  const router = createBrowserRouter([
      {
        path: "/",
        element:<Dashboard/>
      },
      {
        path: "/mobile",
        element: <Mobile/>,
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
        element: <LogIn/> 
      }

    ]
  );

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
