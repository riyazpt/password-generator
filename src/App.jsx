import { useCallback, useState,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(5)
  const [numberAllowed, setNumberALlowed] = useState(0)
  const [charAllowed, setCharAllowed] = useState(0)
  const [numAllowed, setNumAllowed] = useState(0)
  const [password, setPassword] = useState("")
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+[]{}|;:,.<>?";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);

    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])
  
  const inputRef = useRef(null)
  const handleCopy=useCallback(()=>{
    inputRef.current.focus()
    inputRef.current.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])
  return (
    <>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">   <h1 className="text-3xl font-bold  text-white bg-blue-500 p-4">
        Password Generator
      </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4"></div>
        <div className="flex items-center gap-2 my-4">
  <input
    ref={inputRef}
    type="text"
    value={password}
    className="bg-white py-3 px-3 flex-grow rounded-l outline-none text-black"
    placeholder="Generated password"
    readOnly
  />
  <button
    onClick={handleCopy}
    className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition transform px-4 py-3 text-white font-semibold rounded-r shadow"
  >
    Copy
  </button>
</div>

      

      <div className='flex text-sm gap-x-2'>
        <div className='flex-items-center gap-x-1'>
          <div className="flex items-center gap-x-1"></div>
          <label className="block text-white mt-4">
            Length:
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white outline-none"
             
            />
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <label className="block text-white mt-4">
            Include Numbers:
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberALlowed((prev)=>!prev)}
              className="ml-2"
            />
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <label className="block text-white mt-4">
            Include Special Characters:
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed((prev)=>!prev)}
              className="ml-2"
            />
          </label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
