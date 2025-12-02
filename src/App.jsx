import { useState } from 'react'
import './App.css'
import { ConfirmButton } from './components/button/confirm/ConfirmButton'
import { Logo } from './components/logo/Logo'

function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <h1>fgrfr</h1>
      <Logo></Logo>
      <ConfirmButton name="Cerca"></ConfirmButton>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          I task completati oggi sono: {count}
        </button>
      </div>
    </>
  )
}

export default App
