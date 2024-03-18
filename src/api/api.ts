import axios from 'axios';

interface ApiConfig {
  baseUrl: string;
  queryParams?: {[key: string]: string | string[] | number};
}

interface ApiResponse {
  data?: any;
  error?: string;
}

interface SearchByKeyWordParams {
  keyword: string;
  healthFilter?: string;
  params: {to: number; from: number};
}

interface Recipe {
  label: string;
  source: string;
  image: string;
}
interface CB {
  data: Recipe[];
  more: boolean;
}

interface FetchRecipeProps {
  string: string;
  healthFilter: string | null;
  callback?: ({data, more}: CB) => void;
  onError?: (error: any) => void;
  params: {
    to: number;
    from: number;
  };
}

export const API_URL = 'https://api.edamam.com/search';
export const APP_ID = process.env.APP_ID || '';
export const APP_KEY = process.env.APP_KEY || '';

const apiConfig: ApiConfig = {
  baseUrl: API_URL,
  queryParams: {
    app_id: APP_ID,
    app_key: APP_KEY,
  },
};

const apiRequest = async (config: ApiConfig): Promise<ApiResponse> => {
  try {
    const response = await axios.get(config.baseUrl, {
      params: config.queryParams,
    });
    return {data: response.data};
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const searchByKeyword = async ({
  keyword,
  healthFilter,
  params,
}: SearchByKeyWordParams) => {
  const config = apiConfig;
  config.queryParams = {
    ...apiConfig.queryParams,
    q: keyword,
    from: params.from,
    to: params.to,
  };
  if (healthFilter?.toLowerCase()) {
    config.queryParams.health = healthFilter || '';
  }
  console.log(config);
  const response = await apiRequest(config);
  return response;
};

export const fetchRecipesForSearchPage = async ({
  string,
  healthFilter,
  params,
  callback,
  onError,
}: FetchRecipeProps) => {
  const data: Recipe[] = [];
  console.log('STARTED FETCHING');
  try {
    const response = await searchByKeyword({
      keyword: string,
      healthFilter,
      params,
    });
    const responseData = response.data.hits;
    const more = response.data.more;
    console.log(
      `FETCHING, from ${response.data.from}, to ${response.data.to}, has more data? ${response.data.more} `,
    );
    responseData.map((hit: any) => {
      const recipe = {
        label: hit.recipe.label,
        source: hit.recipe.source,
        image: hit.recipe.image,
        uri: hit.recipe.uri,
        url: hit.recipe.url,
        calories: hit.recipe.calories,
        totalWeight: hit.recipe.totalWeight,
        totalTime: hit.recipe.totalTime,
      };
      data.push(recipe);
    });

    callback && callback({data: data, more});
    return {data, more};
  } catch (error: any) {
    onError && onError(error);
    throw new Error(error.message);
  }
};
