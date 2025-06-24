import { useEffect, useState, useCallback } from "react";
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import { default as createAxiosInstance } from "../instance";

// Cache object to store responses
const cache: Record<string, any> = {};

export const useFetch = <T,>(
  url: string,
  method: string | undefined,
  body: any = null,
  token?:string
) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    let isMounted = true; // Guard to prevent state updates if unmounted
    let cancelTokenSource: CancelTokenSource;

    setLoading(true);
    try {
      // Check if the response is already cached
      if (cache[url]) {
        if (isMounted) {
          setResponse(cache[url]);
        }
        return;
      }

      const axiosInstance = createAxiosInstance(url);
      cancelTokenSource = axios.CancelToken.source();

      const config: AxiosRequestConfig = {
        url,
        method,
        data: body,
        cancelToken: cancelTokenSource.token,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
      };

      const response = await axiosInstance.request<T>(config);

      if (isMounted) {
        setResponse(response.data);
        // Cache the response
        cache[url] = response.data;
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

    // Cleanup function to cancel request and prevent state updates if unmounted
    return () => {
      isMounted = false;
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled due to component unmounting.");
      }
    };
  }, [url, method, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to manually re-fetch data
  const reFetch = useCallback(() => {
    // Invalidate the cache for the URL
    delete cache[url];
    fetchData();
  }, [fetchData, url]);

  return { response, loading, error, reFetch };
};