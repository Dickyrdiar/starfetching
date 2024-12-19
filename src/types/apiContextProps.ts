export interface apiContextProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  error: string | null;
  startFetching: (url: string) => Promise<void>;
  startFetchingIf: (url: string, condition: boolean) => Promise<void>;
}