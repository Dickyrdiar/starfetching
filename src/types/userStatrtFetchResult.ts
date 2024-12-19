export interface useFethResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}