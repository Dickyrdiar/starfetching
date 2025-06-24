// export { default as WrappingComponent } from './Wrapping';
import { useFetch } from './startFetching/useFetch';
import { useFetchIf } from './startFetching/useFetchIf';
import { default as  WrappingComponent}  from './components/Wrapping';
import { startCallBack } from './startCallBack/startCallback';
import createAxiosInstance from './instance';

export { useFetch, useFetchIf, WrappingComponent };

// Ensure all imports are correctly defined and exported
const library = {
  useFetch,
  useFetchIf,
  startCallBack,
  WrappingComponent,
  createAxiosInstance
}

export default library;
