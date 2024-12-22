import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFetchIf } from '../startFetching/useFetchIf'; // <-- Add semicolon here

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetchIf', () => {
  it('should fetch data successfully', async () => {
    const mockData = { message: 'Hello, world!' };
    mockedAxios.request.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useFetchIf('https://swapi.dev/api/people/1/', 'GET', null, true));
    await act(async () => {
      await waitForNextUpdate();
    });
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.response).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Network Error');
    mockedAxios.request.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useFetchIf('https://swapi.dev/api/people/1/', 'GET', null, true));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.response).toBeNull();
    expect(result.current.error).toBe(mockError.message);
  });
});
