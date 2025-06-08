import { useCallback, useEffect, useState } from "react"
import createAxiosInstance from "../instance"
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios"


export const startCallBack = <T,>(
  method: string | undefined,
  url: string
) => {
  const [response, setResponse] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    let cancelTokenSource: CancelTokenSource;

    setLoading(true)
    try {
      const axiosInstace = createAxiosInstance(url);
      cancelTokenSource = axios.CancelToken.source()

      const config: AxiosRequestConfig = {
        method,
        url,
        cancelToken: cancelTokenSource.token
      }

      const response = await axiosInstace.request<T>(config)
      setResponse(response?.data)
      
    } catch (err: unknown) {
      if (axios.isCancel(err)) {
        console.log("Request candeled", err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    } finally {
      setLoading(false)
    }
  }, [url, method])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { response, loading, error }
}