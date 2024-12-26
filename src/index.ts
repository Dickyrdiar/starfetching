// export { default as WrappingComponent } from './Wrapping';
import { useFetch } from './startFetching/useFetch';
import { useFetchIf } from './startFetching/useFetchIf';
import { default as  WrappingComponent}  from './components/Wrapping';

// Ensure all imports are correctly defined and exported
const library = {
  useFetch,
  useFetchIf,
  WrappingComponent
}

export default library;
