import { useState } from 'react'

import './App.css'

function App() {
  const [colorbg, setcolorbg] = useState("bg-olive-500")

  return (
    <div className={`<div className="w-full h-screen ${colorbg} text-white"> `}>
      <button onClick={() => { setcolorbg("bg-red-500") }} style={{ color: "white", background: "red" }} >Red</button>
      <button onClick={() => { setcolorbg("bg-green-500") }} style={{ color: "white", background: "green" }} >green</button>
      <button onClick={() => { setcolorbg("bg-pink-500") }} style={{ color: "white", background: "pink" }} >pink</button>
    </div>

  )
}

export default App
