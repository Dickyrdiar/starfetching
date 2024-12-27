/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { useFetch } from 'startfetch'
import { useFetch } from 'startfetch'

function App() {
  const [count, setCount] = useState(0)
  const [startFethching, setStartFetching] = useState(false)
  const { response, loading, error } = useFetch(
    "https://sw-api.starnavi.io/planets", 
    "GET",
  )

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
              {/* {response} */}
              {response?.results?.map((val) => (
                <p>{val.name}</p>
              ))}
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
        </div>
      )}
    </>
  )
}

export default App
