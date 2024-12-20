import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { startFetchingIf } from '../startFetching/useFetchIf';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('startFetchingIf', () => {
  it('fetches data successfully', async () => {
    const data = { message: 'Hello, world!' };
    mockedAxios.get.mockResolvedValueOnce({ data });

    const { result, waitForNextUpdate } = renderHook(() => startFetchingIf<typeof data>('https://api.example.com/data'));

    act(() => {
      result.current.startFetcing = true;
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(data);
    expect(result.current.error).toBeNull();
  });

  it('handles error state', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => startFetchingIf<null>('https://api.example.com/data'));

    act(() => {
      result.current.startFetcing = true;
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });
});
