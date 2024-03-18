import axios from 'axios';

import {
  API_URL,
  APP_ID,
  APP_KEY,
  fetchRecipesForSearchPage,
  searchByKeyword,
} from '../../src/api/api';

jest.mock('axios');

// jest.mock('process', () => ({
//   env: {
//     APP_ID: APP_ID,
//     APP_KEY: APP_KEY,
//   },
// }));

describe('searchByKeyword function', () => {
  it('should return data from API', async () => {
    const keyword = 'chicken';
    const healthFilter = 'vegan';
    const params = {from: 0, to: 10};
    const responseData = {hits: [{recipe: {label: 'Chicken Curry'}}]};

    axios.get.mockResolvedValue({data: responseData});

    const response = await searchByKeyword({keyword, healthFilter, params});

    expect(response.data).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(API_URL, {
      params: {
        q: keyword,
        from: params.from,
        to: params.to,
        app_id: APP_ID,
        app_key: APP_KEY,
        health: healthFilter,
      },
    });
  });
});

describe('fetchRecipesForSearchPage function', () => {
  it('should fetch recipes and call callback with data', async () => {
    const string = 'pasta';
    const healthFilter = 'vegetarian';
    const params = {from: 0, to: 5};
    const callback = jest.fn();
    const responseData = {hits: [{recipe: {label: 'Pasta Salad'}}], more: true};

    axios.get.mockResolvedValue({data: responseData});

    await fetchRecipesForSearchPage({string, healthFilter, params, callback});

    expect(callback).toHaveBeenCalledWith({
      data: [{label: 'Pasta Salad', source: undefined, image: undefined}],
      more: true,
    });
    expect(axios.get).toHaveBeenCalledWith(API_URL, {
      params: {
        q: string,
        from: params.from,
        to: params.to,
        app_id: APP_ID,
        app_key: APP_KEY,
        health: healthFilter,
      },
    });
  });

  it('should call onError if an error occurs', async () => {
    const string = 'pizza';
    const healthFilter = 'none';
    const params = {from: 0, to: 5};
    const onError = jest.fn();
    const errorMessage = 'Failed to fetch data';

    axios.get.mockRejectedValue(new Error(errorMessage));

    try {
      await fetchRecipesForSearchPage({string, healthFilter, params, onError});
    } catch (error) {
      expect(onError).toHaveBeenCalledWith(new Error(errorMessage));
    }
  });
});
