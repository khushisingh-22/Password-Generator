import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 8);
    window.navigator.clipboard.writeText(password);
    alert("your Password copy to clipboard");
  }, [password]);

  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 py-4">
        <h1 className="text-center text-red-400 text-xl font-bold mb-3">
          Password Generator
        </h1>

        <div className="flex bg-green-200 rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 "
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-2 shrink-0 hover:bg-blue-800"
          >
            Copy
          </button>
        </div>

        <div className="flex items-center gap-x-2 mb-3">
          <input
            type="range"
            min={6}
            max={18}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-white">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-2 mb-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput" className="text-white">
            Number
          </label>
        </div>

        <div className="flex items-center gap-x-2 mb-4">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput" className="text-white">
            Character
          </label>
        </div>

        <button
          onClick={passwordGenerator}
          className="bg-skyblue-800 text-white w-full py-2 rounded-md hover:bg-green-700"
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;