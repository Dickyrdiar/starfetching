import { useEffect, useState } from "react";
import { useFetchIfProps } from "../types/userStatrtFetchResult";
import axios from "axios";

export const startFetchingIf = <T ,>(url: string): useFetchIfProps<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [startFetcing, setStartFetching] = useState<boolean>(false);

  useEffect(() => {
    if (startFetcing) {
      setLoading(true);

      const fetchData = async () => {
        try {
          const response = await axios.get<T>(url);
          setData(response.data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [url, startFetcing]);

  return { data, loading, error, startFetcing };
}