import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, CancelTokenSource} from "axios";
import createAxiosInstance from "../instance";

export const useFetchIf = <T, >(url: string, method: string | undefined, body: any, startFetching: boolean) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounthed = true;
    let cancelTokenSource: CancelTokenSource;

    if (startFetching) {
      setLoading(true);

      const fetchData = async () => {
        try {
          const axiosInstace = createAxiosInstance(url);
          cancelTokenSource = axios.CancelToken.source();
          
          const config: AxiosRequestConfig = { 
            url,
            method,
            data: body,
            cancelToken: cancelTokenSource.token,
          }

          const result = await axiosInstace.request<T>(config);
          setResponse(result.data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          if (isMounthed) setLoading(false);
        }
      };

      fetchData();
    }
  }, [url, method, body, startFetching]);

  return { url, method, body, startFetching, response, loading, error };
};