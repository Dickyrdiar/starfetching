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
import { WrappingComponent } from 'startfetch';

const App = () => (
  <WrappingComponent>
    <YourComponent />
  </WrappingComponent>
);

export default App;
```

### useFetch Hook

The `useFetch` hook allows you to access the API context within your components.

```tsx
import React from 'react';
import { useFetch } from 'startfetch';

const YourComponent = () => {
  const { response, loading, error } = useFetch('https://swapi.py4e.com/api/planets', 'GET');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default YourComponent;
```

### useFetchIf Hook

The `useFetchIf` hook allows you to conditionally fetch data based on a condition.

```tsx
import React from 'react';
import { useFetchIf } from 'startfetch';

const ConditionalComponent = () => {
  const { response, loading, error } = useFetchIf('https://swapi.py4e.com/api/planets', 'GET', true);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ConditionalComponent;
```

### useFetchIf with Button Condition

The `useFetchIf` hook can also be used with a button to conditionally fetch data.

```tsx
import React, { useState } from 'react';
import { useFetchIf } from 'startfetch';

const ButtonConditionalComponent = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { response, loading, error } = useFetchIf('https://swapi.py4e.com/api/planets', 'GET', shouldFetch);

  const handleClick = () => {
    setShouldFetch(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleClick}>Fetch Data</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ButtonConditionalComponent;
```

### useFetchIf with Request Body

The `useFetchIf` hook can also be used to conditionally fetch data with a request body.

```tsx
import React from 'react';
import { useFetchIf } from 'startfetch';

const RequestBodyComponent = () => {
  const { response, loading, error } = useFetchIf('https://swapi.py4e.com/api/planets', 'GET');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default RequestBodyComponent;
```

## API

### WrappingComponent Props

- `children`: The components that will have access to the API context.

### API Context Hook

The `useFetch` hook provides the following values:

- `response`: The data fetched from the API.
- `loading`: A boolean indicating if the data is currently being fetched.
- `error`: An error message if the fetch failed.

### useFetchIf Hook

The `useFetchIf` hook provides the following values:

- `response`: The data fetched from the API.
- `loading`: A boolean indicating if the data is currently being fetched.
- `error`: An error message if the fetch failed.
- `startFetchingIf(url: string, condition: boolean, body?: object)`: A function to start fetching data from the given URL if the condition is true. Optionally, a request body can be provided.

## License

This project is licensed under the MIT License.
