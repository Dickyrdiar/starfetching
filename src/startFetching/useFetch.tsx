import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import {default as createAxiosInstance} from "../instance";

export const useFetch = <T,>(
  url: string,
  method: string | undefined,
  body: any = null
) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Updated error state type

  useEffect(() => {
    let isMounted = true; // Guard to prevent state updates if unmounted
    let cancelTokenSource: CancelTokenSource;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Create an axios instance with cancel token
        const axiosInstance = createAxiosInstance(url);
        cancelTokenSource = axios.CancelToken.source();

        const config: AxiosRequestConfig = {
          url,
          method,
          data: body,
          cancelToken: cancelTokenSource.token,
        };

        const response = await axiosInstance.request<T>(config);

        if (isMounted) {
          setResponse(response.data);
        }
      } catch (error: unknown) {
        if (isMounted) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else if (error instanceof Error) {
            setError(error.message); // Assign error message
          } else {
            setError("An unknown error occurred."); // Assign default error message
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel request and prevent state updates if unmounted
    return () => {
      isMounted = false;
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled due to component unmounting.");
      }
    };
  }, [url, method, body]);

  return { response, loading, error };
};
