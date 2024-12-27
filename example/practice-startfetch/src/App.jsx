 
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFetchIf } from '../../..'

function App() {
  const [count, setCount] = useState(0)
  const [startFethching, setStartFetching] = useState(false)
  const { response, loading, error } = useFetchIf(
    "https://sw-api.starnavi.io/planets", 
    "GET",
    null,
    startFethching,
  )

  console.log("response", response)

  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
           <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
             <button onClick={() => setStartFetching(true)}>click this</button>
            </div>

            <p className="read-the-docs">
             {response?.results?.map((val) => (
              <p key={val.id}>{val.name}</p>
             ))}
            </p>
        </div>
      )}
    </>
  )
}

export default App
