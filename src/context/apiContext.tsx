import React, { createContext, useContext, useState } from "react";
import { apiContextProps } from "../types/apiContextProps";
import { useFetch } from "../startFetching/useFetch";
import { useFetchIf } from "../startFetching/useFetchIf";

const ApiContainer = createContext<apiContextProps | undefined>(undefined);

export const useApiContainer = () => {
  const context = useContext(ApiContainer);
  if (!context) {
    throw new Error('useApiContext must be used within a ApiProvider');
  }
  return context;
};

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [startfetch, setStartFetch] = useState<boolean>(false);

  const startFetching = async (urlRequest: string, methodRequest: string | undefined , bodyRequest: any) => {
    const { response, loading, error } = useFetch(
      urlRequest,
      methodRequest ,
      bodyRequest
    );
    setData(response);
    setLoading(loading);
    setError(error);
  };

  async function startFetchingIf(
    urlRequest: string,
    methodRequest: string | undefined,
    bodyRequest: any,
    startFetchingReq: boolean = false
  ) {
    const { response, loading, error } = useFetchIf(
      urlRequest,
      methodRequest || "GET",
      bodyRequest,
      startFetchingReq
    );
  
    if (startFetchingReq) {
      setData(response); // Set the fetched data
      setLoading(loading); // Update loading state
      setError(error); // Set any errors encountered
    }
  }

  return (
    <ApiContainer.Provider value={{ startFetching, startFetchingIf }}>
      {children}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </ApiContainer.Provider>
  );
};