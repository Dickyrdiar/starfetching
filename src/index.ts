// export { default as WrappingComponent } from './Wrapping';
import { useFetch } from './startFetching/useFetch';
import { useFetchIf } from './startFetching/useFetchIf';
import { useApiContainer } from '../src/context/apiContext';
import WrappingComponent from './Wrapping';

// Ensure all imports are correctly defined and exported
export default {
  useFetch,
  useApiContainer,
  useFetchIf,
  WrappingComponent
};
