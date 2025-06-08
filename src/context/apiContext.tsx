import React, { createContext, useContext, useState } from "react";
import { apiContextProps } from "../types/apiContextProps";
import { useFetch } from "../startFetching/useFetch";
import { useFetchIf } from "../startFetching/useFetchIf";
import { startCallBack as startCallBackFn } from "../startCallBack/startCallback";

const ApiContainer = createContext<apiContextProps | undefined>(undefined);

export const useApiContainer = () => {
  const context = useContext(ApiContainer);
  if (!context) {
    throw new Error("useApiContext must be used within a ApiProvider");
  }
  return context;
};

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startFetching = async (
    urlRequest: string,
    methodRequest: string | undefined,
    bodyRequest: any
  ): Promise<void> => {
    const { response, loading, error, reFetch } = useFetch(
      urlRequest,
      methodRequest,
      bodyRequest
    );

    // Update state based on the hook's response
    setData(response);
    setLoading(loading);
    setError(error);

    // Call reFetch function for external use
    reFetch();
  };

  const startFetchingIf = async (
    urlRequest: string,
    methodRequest: string | undefined,
    bodyRequest: any,
    startFetchingReq: boolean = false
  ): Promise<void> => {
    const { response, loading, error, refetch } = useFetchIf(
      urlRequest,
      methodRequest || "GET",
      bodyRequest,
      startFetchingReq
    );
  
    // Update state based on the hook's response
    if (startFetchingReq) {
      setData(response);
      setLoading(loading);
      setError(error);
    }
  
    // Return refetch function for external use
    refetch();
  };

  const startCallBack = async (
    urlRequest: string,
    methodRequest?: string
  ): Promise<void> => {
    const { response, loading, error } = await startCallBackFn(
      urlRequest,
      methodRequest || 'GET'
    )

    setData(response)
    setLoading(loading)
    setError(error)
  }

  return (
    <ApiContainer.Provider value={{ startFetching, startFetchingIf, startCallBack }}>
      {children}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </ApiContainer.Provider>
  );
};