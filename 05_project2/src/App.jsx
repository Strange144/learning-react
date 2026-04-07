import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setpassword] = useState("")
  const [isnumber, setnumber] = useState(false);
  const [ischar, setchar] = useState(false);
  const [length, setlength] = useState(8)
  const [btncolor, setbtncolor] = useState("bg-blue-500");
  const passwordRef = useRef(null)
  const passwordgeneration = useCallback(() => {
    setbtncolor("bg-blue-500")
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXqwertyuiopasdfghjklzxcvbnm"
    if (isnumber) {
      str += "1234567890"
    }
    if (ischar) {
      str += "!@#$%^&*()"
    }
    for (let i = 0; i <= length; i++) {
      let randchar = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randchar)
    }
    setpassword(pass)
  }, [length, isnumber, ischar, setpassword, setbtncolor])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
    setbtncolor("bg-green-500")
  }, [password, setbtncolor])

  useEffect(() => {
    passwordgeneration()
  }, [isnumber, ischar, length, passwordgeneration])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`outline-none ${btncolor} text-white px-3 py-0.5 shrink-0`}
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setlength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isnumber}
            id="numberInput"
            onChange={() => {
              setnumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={ischar}
            id="characterInput"
            onChange={() => {
              setchar((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
