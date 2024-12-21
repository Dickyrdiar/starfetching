import { useEffect, useState } from "react";
import axios from "axios";
import createAxiosInstance from "../instance";

export const useFetchIf = <T, >(url: string, method: string | undefined, body: any, startFetching: boolean) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (startFetching) {
      setLoading(true);

      const fetchData = async () => {
        try {
          const axiosInstace = createAxiosInstance(url);
          const result = await axiosInstace.request<T>({
            url,
            method,
            data: body,
            cancelToken: new axios.CancelToken(c => {
              // cancel = c;
            })
          });
          setResponse(result.data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [url, method, body, startFetching]);

  return { url, method, body, startFetching, response, loading, error };
};