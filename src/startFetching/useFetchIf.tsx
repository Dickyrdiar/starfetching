import { useCallback, useEffect, useState } from "react";
import axios, { AxiosRequestConfig, CancelTokenSource} from "axios";
import createAxiosInstance from "../instance";
const cache: Record<string, any> = {};

export const useFetchIf = <T, >(url: string, method: string | undefined, body: any, startFetching: boolean) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    let isMounted = true;
    let cancelTokenSource: CancelTokenSource;

    if (startFetching) { 
      setLoading(true)  

      if (cache[url]) {
        setResponse(cache[url]);
        setLoading(false);
        return;
      }

      try {
        const axiosInstance = createAxiosInstance(url);
        cancelTokenSource = axios.CancelToken.source();

        const config: AxiosRequestConfig = {
          url,
          method,
          data: body,
          cancelToken: cancelTokenSource.token,
        }

        const result = await axiosInstance.request<T>(config);

        if (isMounted){
          setResponse(result.data);
          setError(null);

          cache[url] = result.data;
        }
      } catch (error: any) {
        if (isMounted) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred.");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    } 
    
  }, [url, method, body, startFetching]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    delete cache[url]
    fetchData();
  }, [fetchData, url]);

  return { response, loading, error, refetch }; 
};