export interface apiContextProps {
  // data: any;
  // setData: React.Dispatch<React.SetStateAction<any>>;
  // loading: boolean;
  // error: string | null;
  startFetching: (url: string, method?: string, body?: any) => Promise<void>;
  startFetchingIf: (url: string, method?: string, body?: any, startFetching?: boolean) => Promise<void>;
}