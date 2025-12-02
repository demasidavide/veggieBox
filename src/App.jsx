import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <h1>Le task di oggi sono:</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          I task completati oggi sono: {count}
        </button>
      </div>
    </>
  )
}

export default App
