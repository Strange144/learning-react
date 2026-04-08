import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Home from './Components/Home/Home.jsx'
import User from './Components/User/User.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Github, { gegithubtdata } from './Components/Github/Github.jsx'
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="" element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/About" element={<About />} />
    <Route path="/Contact" element={<Contact />} />
    <Route path="/User/:userid" element={<User />} />
    <Route
      path="/Github/:gitname?"
      loader={gegithubtdata}
      element={<Github />}
    />
  </Route>
))
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>,
)
