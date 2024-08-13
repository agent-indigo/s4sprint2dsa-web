import {NODES_URL} from '../urls'
import apiSlice from './apiSlice'
const nodesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAll: builder.query({
      query: () => ({
        url: NODES_URL,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    getById: builder.query({
      query: id => ({
        url: `${NODES_URL}/${id}`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    getAllByValue: builder.query({
      query: value => ({
        url: `${NODES_URL}/${value}`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    getAllByHeight: builder.query({
      query: height => ({
        url: `${NODES_URL}/${height}`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    getAllByTreeId: builder.query({
      query: treeId => ({
        url: `${NODES_URL}/${treeId}`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    add: builder.mutation({
      query: node => ({
        url: NODES_URL,
        method: 'GET',
        body: node
      }),
      invalidatesTags: ['node', 'tree']
    }),
    edit: builder.mutation({
      query: (id, node) => ({
        url: `${NODES_URL}/${id}`,
        method: 'PUT',
        body: node
      }),
      invalidatesTags: ['node', 'tree']
    }),
    editValue: builder.mutation({
      query: (id, value) => ({
        url: `${NODES_URL}/${id}/value`,
        method: 'PATCH',
        body: value
      }),
      invalidatesTags: ['node', 'tree']
    }),
    editLeft: builder.mutation({
      query: (id, left) => ({
        url: `${NODES_URL}/${id}/left`,
        method: 'PATCH',
        body: left
      }),
      invalidatesTags: ['node', 'tree']
    }),
    editRight: builder.mutation({
      query: (id, right) => ({
        url: `${NODES_URL}/${id}/right`,
        method: 'PATCH',
        body: right
      }),
      invalidatesTags: ['node', 'tree']
    }),
    editHeight: builder.mutation({
      query: (id, height) => ({
        url: `${NODES_URL}/${id}/height`,
        method: 'PATCH',
        body: height
      }),
      invalidatesTags: ['node', 'tree']
    }),
    deleteAll: builder.mutation({
      query: () => ({
        url: NODES_URL,
        method: 'DELETE'
      }),
      invalidatesTags: ['node', 'tree']
    }),
    deleteById: builder.mutation({
      query: id => ({
        url: `${NODES_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['node', 'tree']
    }),
    deleteAllByValue: builder.mutation({
      query: value => ({
        url: `${NODES_URL}/${value}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['node', 'tree']
    })
  })
})
export const {
  useGetAllQuery,
  useLazyGetAllQuery,
  useGetByIdQuery,
  useLazyGetByIdQuery,
  useGetAllByValueQuery,
  useLazyGetAllByValueQuery,
  useGetAllByHeightQuery,
  useLazyGetAllByHeightQuery,
  useGetAllByTreeIdQuery,
  useLazyGetAllByTreeIdQuery,
  useAddMutation,
  useEditMutation,
  useEditValueMutation,
  useEditLeftMutation,
  useEditRightMutation,
  useEditHeightMutation,
  useDeleteAllMutation,
  useDeleteByIdMutation,
  useDeleteAllByValueMutation
} = nodesApiSlice