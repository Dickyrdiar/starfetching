export interface useFethResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface useFetchIfProps<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  startFetcing: boolean;
}