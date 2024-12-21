import { useEffect, useState } from "react"
import axios from "axios";
import instance from "../instance";
import createAxiosInstance from "../instance";

export const useFetch = <T, >(url: string, method: string | undefined, body: any)=> {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMouhted = true;
    let cancel: () => void;

    setLoading(true);

    const fetchData = async () => {
      try {
        setLoading(true);
        const axiosInstance = createAxiosInstance(url);
        const response = await axiosInstance.request<T>({ 
          url,
          method,
          data: body,
          cancelToken: new axios.CancelToken(c => {
            cancel = c;
          }),
        });
        setResponse(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    isMouhted && fetchData();

    return () => { 
      isMouhted = false;
      cancel();
    }
  }, [url, method, body]);

  return { response, loading, error };

}