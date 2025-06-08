 
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFetchIf } from '../../..'
import { Button } from "@material-tailwind/react";

function App() {
  const [fetchingButton, setFetchingButton] = useState(false)
  const { response, loading, error } = useFetchIf(
    "https://swapi.py4e.com/api/planets",
    "GET",
    null,
    fetchingButton
  )

  const handleClick = () => {
    setFetchingButton(prev => !prev);
  };

  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
            <h1>startFetch example documentation</h1>
            <div className="card">
             <Button
              color='white'
              onClick={handleClick}
             >
              Click this
             </Button>
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
