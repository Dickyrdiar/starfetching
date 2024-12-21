export interface useFetchingProps<T> {
  url: T | null;
  method: T | null;
  body: T | null;
}

export interface useFetchIfProps<T> {
  url: T | null;
  method: T | null;
  body: T | null;
  startFetcing: boolean;
}