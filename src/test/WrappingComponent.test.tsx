import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WrappingComponent, { useApiContext } from '../Wrapping';

const TestComponent: React.FC = () => { // Removed the empty object type annotation
  const { data, loading, error, startFetching } = useApiContext();

  React.useEffect(() => {
    startFetching('https://api.example.com/data');
  }, [startFetching]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
};

test('renders children and fetches data', async () => {
  // Mock the fetch response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: 'Hello, world!' }),
    })
  ) as jest.Mock;

  render(
    <WrappingComponent>
      <TestComponent />
    </WrappingComponent>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the data to be fetched and displayed
  const dataElement = await waitFor(() => screen.getByText(/Data: {"message":"Hello, world!"}/i));
  expect(dataElement).toBeInTheDocument();
});

test('WrappingComponent provides context to children', () => {
  render(
    <WrappingComponent>
      <TestComponent />
    </WrappingComponent>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});