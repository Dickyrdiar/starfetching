import React, { useContext, useEffect, useState } from "react"
import { WrappingProps } from "./types/Wrapping"
import { apiContextProps } from "./types/apiContextProps"
import { useFetch } from "./startFetching/useFetch";
import { useFetchIf } from "./startFetching/useFetchIf";

const ApiContainer = React.createContext<apiContextProps | undefined>(undefined);

export const useApiContainer = () => {
  const context  = useContext(ApiContainer);
  if (!context) {
    throw new Error('useApiContext must be used within a ApiProvider')
  }
  return context
}

const WrappingComponent: React.FC<WrappingProps> = ({ children }) => {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startFetching = async (url: string, method: string | undefined, body: any) => {
    const { response, loading, error } = useFetch(url, method, body);
    setData(response);
    setLoading(loading);
    setError(error);
  }

  const startFetchingIf = async (url: string, method: string | undefined, body: any, startFetching?: boolean) => {
    const { response, loading, error, startFetching: startFetch } = useFetchIf(url, method, body, !!startFetching);
    if (startFetch) {
      setData(response);
      setLoading(loading);
      setError(error);
    }
  };

  return (
    <div className="wrapping-component">
      <ApiContainer.Provider value={{ startFetching, startFetchingIf}}>
        {children}
      </ApiContainer.Provider>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {children}
    </div>
  )
}

export default WrappingComponent