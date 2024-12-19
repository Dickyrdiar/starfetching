# StartFetch Library

## Overview

StartFetch is a React library that provides a context and hooks for managing API calls and their states (loading, error, and data). It includes a wrapping component that simplifies the process of fetching data from APIs.

## Installation

To install the StartFetch library, you can use npm or yarn:

```bash
npm install startfetch
```

or

```bash
yarn add startfetch
```

## Usage

### WrappingComponent

The `WrappingComponent` is a context provider that wraps your application or component tree. It provides the API context to its children.

```tsx
import React from 'react';
import WrappingComponent from 'startfetch';

const App = () => (
  <WrappingComponent>
    <YourComponent />
  </WrappingComponent>
);

export default App;
```

### useApiContext Hook

The `useApiContext` hook allows you to access the API context within your components.

```tsx
import React from 'react';
import { useApiContext } from 'startfetch';

const YourComponent = () => {
  const { data, loading, error, startFetching, startFetchingIf } = useApiContext();

  React.useEffect(() => {
    startFetching('https://api.example.com/data');
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default YourComponent;
```

## API

### WrappingComponent Props

- `children`: The components that will have access to the API context.

### API Context Hook

The `useApiContext` hook provides the following values:

- `data`: The data fetched from the API.
- `loading`: A boolean indicating if the data is currently being fetched.
- `error`: An error message if the fetch failed.
- `startFetching(url: string)`: A function to start fetching data from the given URL.
- `startFetchingIf(url: string, condition: boolean)`: A function to start fetching data from the given URL if the condition is true.


 ## License
This project is licensed under the MIT License.