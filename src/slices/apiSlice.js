import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../urls'
const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: [
    'nodes',
    'trees'
  ],
  endpoints: builder => ({})
})
export default apiSlice