import './App.css'
import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  const[length,setlength] = useState(8)
  const[numAllowed,setNumAllowed] = useState(false)
  const[charAllowed,setCharAllowed] = useState(false)
  const[password,setPassword] = useState('')


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numAllowed) str += '0123456789'
    if(charAllowed) str += '@#$'
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,12)
    window.navigator.clipboard.writeText(password)
  },
  [password])


  // useRef hook
  const passwordRef = useRef(null)

  useEffect(() => {
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])


  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-10 py-10 my-20 text-orange-700 bg-gray-800 ring-offset-2 ring">
      <h1 className="text-white text-center text-3xl font-bold my-2 mb-10">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-5 ring-offset-2 ring">
        <input
            type="text" 
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button 
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-900 hover:bg-blue-700 active:bg-blue-500 text-white font-semibold px-7 py-0.5 shrink-0 ring-offset-2 ring"
        >copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1 text-white mr-12 ml-3">
          <input 
            type="range"
            min={4}
            max={16}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1 text-white mr-12">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numInput"
            className="cursor-pointer"
            onChange={()=>{setNumAllowed((prev)=> !prev)}}
          />
          <label htmlFor="numInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1 text-white">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            className="cursor-pointer"
            onChange={()=>{setCharAllowed((prev)=> !prev)}}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App