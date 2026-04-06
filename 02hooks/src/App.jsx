import { useState } from 'react'

import './App.css'

function App() {
  let [counter, setCounter] = useState(15)
  function increasecount() {
    if (counter < 20) {
      setCounter(prevcont => prevcont + 1)
      setCounter(prevcont => prevcont + 1)
      setCounter(prevcont => prevcont + 1)
      setCounter(prevcont => prevcont + 1)
    }
  }

  function decreasecount() {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }
  return (<>
    <h1>Counter no :- {counter}</h1>
    <button onClick={increasecount}>Increase no</button>
    <button onClick={decreasecount}>Decrease no</button></>
  )
}

export default App
