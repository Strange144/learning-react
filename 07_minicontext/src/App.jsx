import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Usercontextprov from "./Context/Usercontext.jsx"
import User from './Component/User.jsx'
import Login from './Component/Login.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Usercontextprov>
        <h1>React minicontext</h1>
        <Login />
        <User />
      </Usercontextprov>
    </>
  )
}

export default App
