 
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFetch } from '../../..'
import { useFetchIf } from '../../..'



function App() {
  const [fetchingButton, setFetchingButton] = useState(false)
  const { response, loading, error } = useFetchIf(
    "https://swapi.py4e.com/api/planets",
    "GET",
    null,
    fetchingButton
  )

  const handleClick = () => {
    setFetchingButton(!fetchingButton)
  }

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
             <button onClick={handleClick}>click this</button>
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
