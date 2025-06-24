import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useFetchIf } from '../startFetching/useFetchIf';
// import { useFetchIf } from './useFetchIf';

// Mock Axios and your createAxiosInstance
jest.mock('axios');
jest.mock('../instance', () => ({
  __esModule: true,
  default: jest.fn(() => axios)
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData = { name: 'Test User', id: 1 };

describe('useFetchIf', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data when startFetching is true', async () => {
    mockedAxios.request.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchIf('/api/user', 'GET', null, true)
    );

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate(); // Wait for async effect to complete

    expect(result.current.loading).toBe(false);
    expect(result.current.response).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('does not fetch if startFetching is false', async () => {
    const { result } = renderHook(() => useFetchIf('/api/user', 'GET', null, false));

    expect(result.current.response).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockedAxios.request).not.toHaveBeenCalled();
  });

  it('handles error response', async () => {
    mockedAxios.request.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchIf('/api/error', 'GET', null, true)
    );

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.response).toBeNull();
    expect(result.current.error).toBe('Failed to fetch');
  });

  it('refetch clears cache and fetches again', async () => {
    mockedAxios.request.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchIf('/api/user', 'GET', null, true)
    );

    await waitForNextUpdate();
    expect(result.current.response).toEqual(mockData);

    // Set new mock return
    const updatedData = { name: 'Updated User', id: 2 };
    mockedAxios.request.mockResolvedValueOnce({ data: updatedData });

    await act(async () => {
      result.current.refetch();
      await waitForNextUpdate();
    });

    expect(result.current.response).toEqual(updatedData);
  });
});
