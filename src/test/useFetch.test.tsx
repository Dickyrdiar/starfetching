import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import axios from 'axios';
import { useFetch } from '../startFetching/useFetch';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetch', () => {
  it('should fetch planets data successfully', async () => {
    const mockPlanetsData = {
      count: 60,
      next: 'https://swapi.py4e.com/api/planets/?page=2',
      previous: null,
      results: [
        {
          name: 'Tatooine',
          climate: 'arid',
          terrain: 'desert'
        }
      ]
    };

    mockedAxios.request.mockResolvedValueOnce({ data: mockPlanetsData });

    const { result } = renderHook(() => 
      useFetch('https://swapi.py4e.com/api/planets', 'GET', null)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.response).toEqual(mockPlanetsData);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle fetch error for planets API', async () => {
    const mockError = new Error('Request failed with status code 404');
    mockedAxios.request.mockRejectedValueOnce({
      response: {
        status: 404,
        data: { detail: 'Not found' }
      },
      message: 'Request failed with status code 404'
    });

    const { result } = renderHook(() => 
      useFetch('https://swapi.py4e.com/api/planets', 'GET', null)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.response).toBeNull();
      expect(result.current.error).toBe('Request failed with status code 404');
    });
  });

  it('should handle POST request with body data', async () => {
    const mockResponse = { success: true };
    const postData = { name: 'New Planet' };
    
    mockedAxios.request.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => 
      useFetch('https://swapi.py4e.com/api/planets', 'POST', postData)
    );

    await waitFor(() => {
      expect(mockedAxios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://swapi.py4e.com/api/planets',
        data: postData
      });
      expect(result.current.response).toEqual(mockResponse);
    });
  });
});