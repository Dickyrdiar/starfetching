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
  const { response, loading, error } = useFetch('https://api.example.com/data', 'GET');

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

The `useFetchIf` hook allows you to conditionally fetch data based on a condition. Here are examples for different HTTP methods:

#### GET Request

```tsx
import React, { useState } from 'react';
import { useFetchIf } from 'startfetch';

const GetComponent = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { response, loading, error } = useFetchIf(
    'https://api.example.com/data',
    'GET',
    shouldFetch
  );

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
```

#### POST Request

```tsx
import React, { useState } from 'react';
import { useFetchIf } from 'startfetch';

const PostComponent = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const requestBody = {
    title: 'New Item',
    description: 'Description here'
  };

  const { response, loading, error } = useFetchIf(
    'https://api.example.com/items',
    'POST',
    shouldFetch,
    requestBody
  );

  const handleSubmit = () => {
    setShouldFetch(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleSubmit}>Create Item</button>
      {response && <div>Successfully created!</div>}
    </div>
  );
};
```

#### PUT Request

```tsx
import React, { useState } from 'react';
import { useFetchIf } from 'startfetch';

const PutComponent = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const requestBody = {
    id: 1,
    title: 'Updated Item',
    description: 'Updated description'
  };

  const { response, loading, error } = useFetchIf(
    'https://api.example.com/items/1',
    'PUT',
    shouldFetch,
    requestBody
  );

  const handleUpdate = () => {
    setShouldFetch(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleUpdate}>Update Item</button>
      {response && <div>Successfully updated!</div>}
    </div>
  );
};
```

#### DELETE Request

```tsx
import React, { useState } from 'react';
import { useFetchIf } from 'startfetch';

const DeleteComponent = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  
  const { response, loading, error } = useFetchIf(
    'https://api.example.com/items/1',
    'DELETE',
    shouldFetch
  );

  const handleDelete = () => {
    setShouldFetch(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleDelete}>Delete Item</button>
      {response && <div>Successfully deleted!</div>}
    </div>
  );
};
```

## API

### WrappingComponent Props

- `children`: The components that will have access to the API context.

### Hook Return Values

Both `useFetch` and `useFetchIf` hooks provide the following values:

- `response`: The data received from the API.
- `loading`: A boolean indicating if the request is currently in progress.
- `error`: An error message if the request failed.

### useFetchIf Parameters

The `useFetchIf` hook accepts the following parameters:

- `url` (string): The API endpoint URL
- `method` (string): The HTTP method ('GET', 'POST', 'PUT', 'DELETE')
- `condition` (boolean): Whether to execute the request
- `body` (optional object): The request body for POST and PUT requests

## License

This project is licensed under the MIT License.
