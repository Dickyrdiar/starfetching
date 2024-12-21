/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
/**
 * @jest-environment jsdom
 */
import WrappingComponent, { useApiContainer } from '../Wrapping';
import { useFetch } from '../startFetching/useFetch';
import { useFetchIf } from '../startFetching/useFetchIf';

jest.mock('../startFetching/useFetch');
jest.mock('../startFetching/useFetchIf');

describe('WrappingComponent', () => {
  it('renders children correctly', () => {
    render(
      <WrappingComponent>
        <div>Test Child</div>
      </WrappingComponent>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('displays loading state', async () => {
    (useFetch as jest.Mock).mockReturnValue({ response: null, loading: true, error: null });
    render(
      <WrappingComponent>
        <div>Test Child</div>
      </WrappingComponent>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', async () => {
    (useFetch as jest.Mock).mockReturnValue({ response: null, loading: false, error: 'Error occurred' });
    render(
      <WrappingComponent>
        <div>Test Child</div>
      </WrappingComponent>
    );
    expect(screen.getByText(/Error:.*Error occurred/)).toBeInTheDocument();
  });

  it('displays data', async () => {
    const mockData = { key: 'value' };
    (useFetch as jest.Mock).mockReturnValue({ response: mockData, loading: false, error: null });
    render(
      <WrappingComponent>
        <div>Test Child</div>
      </WrappingComponent>
    );
    await waitFor(() => expect(screen.getByText(JSON.stringify(mockData, null, 2))).toBeInTheDocument());
  });

  it('throws error when useApiContainer is used outside ApiProvider', () => {
    const TestComponent = () => {
      useApiContainer();
      return <div>Test</div>;
    };
    expect(() => render(<TestComponent />)).toThrow('useApiContext must be used within a ApiProvider');
  });
});
