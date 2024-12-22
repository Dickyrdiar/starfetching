import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFetch } from '../startFetching/useFetch';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetch', () => {
  it('should fetch data successfully', async () => {
    const mockData = { message: 'Hello, world!' };
    mockedAxios.request.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://swapi.dev/api/people/1/', 'GET', null));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.response).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Network Error');
    mockedAxios.request.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://swapi.dev/api/people/1/', 'GET', null));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.response).toBeNull();
    expect(result.current.error).toBe(mockError.message);
  });
});
