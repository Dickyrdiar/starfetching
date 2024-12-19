import React, { useContext, useState } from "react"
import { WrappingProps } from "./types/Wrapping"
import { apiContextProps } from "./types/apiContextProps"

const ApiContext = React.createContext<apiContextProps | undefined>(undefined);

export const useApiContext = () => {
  const context  = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within a ApiProvider')
  }
  return context
}

const WrappingComponent: React.FC<WrappingProps> = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startFetching = async (url: string) => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const startFetchingIf = async (url: string, condition: boolean) => {
    if (condition) {
      startFetching(url);
    }
  }

  return (
    <div className="wrapping-component">
      <ApiContext.Provider value={{ data, setData, loading, error, startFetching, startFetchingIf }}>
        {children}
      </ApiContext.Provider>
    </div>
  )
}

export default WrappingComponent