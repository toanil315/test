import { ACCESS_TOKEN } from '@/constants';
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env['API_URL'],
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  responseHandler: (value) => {
    value.headers;
    return Promise.resolve(value);
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // trigger refresh token then call api again
  }
  return result;
};
