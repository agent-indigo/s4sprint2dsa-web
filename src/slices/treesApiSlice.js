import {TREES_URL} from '../urls'
import apiSlice from './apiSlice'
const treesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAll: builder.query({
      query: () => ({
        url: TREES_URL,
        method: 'GET'
      }),
      providesTags: ['tree']
    }),
    getById: builder.query({
      query: id => ({
        url: `${TREES_URL}/${id}`,
        method: 'GET'
      }),
      providesTags: ['tree']
    }),
    getByNode: builder.query({
      query: node => ({
        url: `${TREES_URL}/${node}`,
        method: 'GET'
      }),
      providesTags: ['tree']
    }),
    add: builder.mutation({
      query: values => ({
        url: TREES_URL,
        method: 'POST',
        body: values
      }),
      invalidatesTags: ['node', 'tree']
    }),
    addNode: builder.mutation({
      query: (id, value) => ({
        url: `${TREES_URL}/${id}/nodes`,
        method: 'POST',
        body: value
      }),
      invalidatesTags: ['node', 'tree']
    }),
    traversePreOrder: builder.query({
      query: (id, node) => ({
        url: `${TREES_URL}/${id}/traversePreOrder/${node}`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    traversePostOrder: builder.query({
      query: (id, node) => ({
        url: `${TREES_URL}/${id}/traversePostOrder/${node}`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    traverseInOrder: builder.query({
      query: (id, node) => ({
        url: `${TREES_URL}/${id}/traverseInOrder/${node}`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    traverseLevelOrder: builder.query({
      query: id => ({
        url: `${TREES_URL}/${id}/traverseLevelOrder`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    search: builder.query({
      query: (id, value) => ({
        url: `${TREES_URL}/${id}/search/${value}`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    getDeepestNode: builder.query({
      query: id => ({
        url: `${TREES_URL}/${id}/deepestNode`,
        method: 'GET'
      }),
      providesTags: ['node']
    }),
    deleteDeepestNode: builder.mutation({
      query: id => ({
        url: `${TREES_URL}/${id}/deepestNode`,
        method: 'DELETE'
      }),
      invalidatesTags: ['node', 'tree']
    }),
    deleteNodesByValue: builder.mutation({
      query: (id, value) => ({
        url: `${TREES_URL}/${id}/nodes/${value}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['node', 'tree']
    }),
    deleteNodeById: builder.mutation({
      query: (treeId, nodeId) => ({
        url: `${TREES_URL}/${treeId}/nodes/${nodeId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['node', 'tree']
    }),
    deleteAll: builder.mutation({
      query: () => ({
        url: TREES_URL,
        method: 'DELETE'
      }),
      invalidatesTags: ['node', 'tree']
    }),
    deleteById: builder.mutation({
      query: id => ({
        url: `${TREES_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['node', 'tree']
    }),
    deleteByNode: builder.mutation({
      query: node => ({
        url: `${TREES_URL}/${node}`,
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
  useGetByNodeQuery,
  useLazyGetByNodeQuery,
  useAddMutation,
  useAddNodeMutation,
  useTraversePreOrderQuery,
  useLazyTraversePreOrderQuery,
  useTraversePostOrderQuery,
  useLazyTraversePostOrderQuery,
  useTraverseInOrderQuery,
  useLazyTraverseInOrderQuery,
  useTraverseLevelOrderQuery,
  useLazyTraverseLevelOrderQuery,
  useSearchQuery,
  useLazySearchQuery,
  useGetDeepestNodeQuery,
  useLazyGetDeepestNodeQuery,
  useDeleteDeepestNodeMutation,
  useDeleteNodeByIdMutation,
  useDeleteNodesByValueMutation,
  useDeleteAllMutation,
  useDeleteByIdMutation,
  useDeleteByNodeMutation
} = treesApiSlice