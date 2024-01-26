import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AdCreateEntity = {
  category: PartialCategoryEntity;
  description?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type AdEntity = {
  __typename?: 'AdEntity';
  category: CategoryEntity;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  tags?: Maybe<Array<TagEntity>>;
  title: Scalars['String']['output'];
};

export type AdUpdateEntity = {
  category?: InputMaybe<PartialCategoryEntity>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryCreateEntity = {
  name: Scalars['String']['input'];
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  ads: Array<AdEntity>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CategoryUpdateEntity = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd: AdEntity;
  createCategory: CategoryEntity;
  createTag: TagEntity;
  deleteAd: Array<AdEntity>;
  deleteCategory: Scalars['String']['output'];
  deleteTag: Array<TagEntity>;
  patchAd: AdEntity;
  patchCategory: CategoryEntity;
  patchTag: TagEntity;
};


export type MutationCreateAdArgs = {
  infos: AdCreateEntity;
};


export type MutationCreateCategoryArgs = {
  infos: CategoryCreateEntity;
};


export type MutationCreateTagArgs = {
  infos: TagCreateEntity;
};


export type MutationDeleteAdArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['String']['input'];
};


export type MutationPatchAdArgs = {
  id: Scalars['String']['input'];
  infos: AdUpdateEntity;
};


export type MutationPatchCategoryArgs = {
  id: Scalars['String']['input'];
  infos: CategoryUpdateEntity;
};


export type MutationPatchTagArgs = {
  id: Scalars['String']['input'];
  infos: TagCreateEntity;
};

export type PartialCategoryEntity = {
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: AdEntity;
  getAdBySlug: AdEntity;
  getCategoryById: CategoryEntity;
  getListAd: Array<AdEntity>;
  getListCategories: Array<CategoryEntity>;
  getListTags: Array<TagEntity>;
  getTagById: TagEntity;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAdBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetListAdArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTagByIdArgs = {
  id: Scalars['String']['input'];
};

export type TagCreateEntity = {
  name: Scalars['String']['input'];
};

export type TagEntity = {
  __typename?: 'TagEntity';
  ads: Array<AdEntity>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateAdMutationVariables = Exact<{
  infos: AdCreateEntity;
}>;


export type CreateAdMutation = { __typename?: 'Mutation', createAd: { __typename?: 'AdEntity', id: string, description: string, createdAt: string, location: string, owner: string, picture: string, price: number, slug: string, title: string, category: { __typename?: 'CategoryEntity', name: string, id: string }, tags?: Array<{ __typename?: 'TagEntity', name: string, id: string }> | null } };

export type PatchAdMutationVariables = Exact<{
  infos: AdUpdateEntity;
  id: Scalars['String']['input'];
}>;


export type PatchAdMutation = { __typename?: 'Mutation', patchAd: { __typename?: 'AdEntity', description: string, location: string, owner: string, picture: string, price: number, title: string } };

export type DeleteAdMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteAdMutation = { __typename?: 'Mutation', deleteAd: Array<{ __typename?: 'AdEntity', id: string }> };

export type CreateCategoryMutationVariables = Exact<{
  infos: CategoryCreateEntity;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoryEntity', id: string, name: string } };

export type PatchCategoryMutationVariables = Exact<{
  infos: CategoryUpdateEntity;
  id: Scalars['String']['input'];
}>;


export type PatchCategoryMutation = { __typename?: 'Mutation', patchCategory: { __typename?: 'CategoryEntity', id: string, name: string } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: string };

export type CreateTagMutationVariables = Exact<{
  infos: TagCreateEntity;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'TagEntity', id: string, name: string } };

export type PatchTagMutationVariables = Exact<{
  infos: TagCreateEntity;
  id: Scalars['String']['input'];
}>;


export type PatchTagMutation = { __typename?: 'Mutation', patchTag: { __typename?: 'TagEntity', id: string } };

export type DeleteTagMutationVariables = Exact<{
  deleteTagId: Scalars['String']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: Array<{ __typename?: 'TagEntity', id: string }> };

export type GetListAdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListAdQuery = { __typename?: 'Query', getListAd: Array<{ __typename?: 'AdEntity', createdAt: string, description: string, id: string, location: string, owner: string, picture: string, price: number, slug: string, title: string, category: { __typename?: 'CategoryEntity', id: string, name: string }, tags?: Array<{ __typename?: 'TagEntity', name: string, id: string }> | null }> };

export type GetAdByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'AdEntity', createdAt: string, description: string, id: string, location: string, owner: string, picture: string, price: number, slug: string, title: string, category: { __typename?: 'CategoryEntity', id: string, name: string }, tags?: Array<{ __typename?: 'TagEntity', id: string, name: string }> | null } };

export type GetAdBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetAdBySlugQuery = { __typename?: 'Query', getAdBySlug: { __typename?: 'AdEntity', createdAt: string, description: string, id: string, location: string, owner: string, picture: string, price: number, slug: string, title: string, category: { __typename?: 'CategoryEntity', id: string, name: string }, tags?: Array<{ __typename?: 'TagEntity', id: string, name: string }> | null } };

export type GetListCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListCategoriesQuery = { __typename?: 'Query', getListCategories: Array<{ __typename?: 'CategoryEntity', id: string, name: string }> };

export type GetCategoryByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', getCategoryById: { __typename?: 'CategoryEntity', id: string, name: string, ads: Array<{ __typename?: 'AdEntity', createdAt: string, description: string, id: string, location: string, owner: string, picture: string, price: number, slug: string, title: string, tags?: Array<{ __typename?: 'TagEntity', id: string, name: string }> | null, category: { __typename?: 'CategoryEntity', id: string, name: string } }> } };

export type GetListTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListTagsQuery = { __typename?: 'Query', getListTags: Array<{ __typename?: 'TagEntity', id: string, name: string }> };

export type GetTagByIdQueryVariables = Exact<{
  getTagByIdId: Scalars['String']['input'];
}>;


export type GetTagByIdQuery = { __typename?: 'Query', getTagById: { __typename?: 'TagEntity', id: string, name: string } };


export const CreateAdDocument = gql`
    mutation CreateAd($infos: AdCreateEntity!) {
  createAd(infos: $infos) {
    id
    description
    createdAt
    category {
      name
      id
    }
    location
    owner
    picture
    price
    slug
    tags {
      name
      id
    }
    title
  }
}
    `;
export type CreateAdMutationFn = Apollo.MutationFunction<CreateAdMutation, CreateAdMutationVariables>;

/**
 * __useCreateAdMutation__
 *
 * To run a mutation, you first call `useCreateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdMutation, { data, loading, error }] = useCreateAdMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdMutation, CreateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdMutation, CreateAdMutationVariables>(CreateAdDocument, options);
      }
export type CreateAdMutationHookResult = ReturnType<typeof useCreateAdMutation>;
export type CreateAdMutationResult = Apollo.MutationResult<CreateAdMutation>;
export type CreateAdMutationOptions = Apollo.BaseMutationOptions<CreateAdMutation, CreateAdMutationVariables>;
export const PatchAdDocument = gql`
    mutation PatchAd($infos: AdUpdateEntity!, $id: String!) {
  patchAd(infos: $infos, id: $id) {
    description
    location
    owner
    picture
    price
    title
  }
}
    `;
export type PatchAdMutationFn = Apollo.MutationFunction<PatchAdMutation, PatchAdMutationVariables>;

/**
 * __usePatchAdMutation__
 *
 * To run a mutation, you first call `usePatchAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePatchAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [patchAdMutation, { data, loading, error }] = usePatchAdMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePatchAdMutation(baseOptions?: Apollo.MutationHookOptions<PatchAdMutation, PatchAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PatchAdMutation, PatchAdMutationVariables>(PatchAdDocument, options);
      }
export type PatchAdMutationHookResult = ReturnType<typeof usePatchAdMutation>;
export type PatchAdMutationResult = Apollo.MutationResult<PatchAdMutation>;
export type PatchAdMutationOptions = Apollo.BaseMutationOptions<PatchAdMutation, PatchAdMutationVariables>;
export const DeleteAdDocument = gql`
    mutation DeleteAd($id: String!) {
  deleteAd(id: $id) {
    id
  }
}
    `;
export type DeleteAdMutationFn = Apollo.MutationFunction<DeleteAdMutation, DeleteAdMutationVariables>;

/**
 * __useDeleteAdMutation__
 *
 * To run a mutation, you first call `useDeleteAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdMutation, { data, loading, error }] = useDeleteAdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdMutation, DeleteAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdMutation, DeleteAdMutationVariables>(DeleteAdDocument, options);
      }
export type DeleteAdMutationHookResult = ReturnType<typeof useDeleteAdMutation>;
export type DeleteAdMutationResult = Apollo.MutationResult<DeleteAdMutation>;
export type DeleteAdMutationOptions = Apollo.BaseMutationOptions<DeleteAdMutation, DeleteAdMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($infos: CategoryCreateEntity!) {
  createCategory(infos: $infos) {
    id
    name
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const PatchCategoryDocument = gql`
    mutation PatchCategory($infos: CategoryUpdateEntity!, $id: String!) {
  patchCategory(infos: $infos, id: $id) {
    id
    name
  }
}
    `;
export type PatchCategoryMutationFn = Apollo.MutationFunction<PatchCategoryMutation, PatchCategoryMutationVariables>;

/**
 * __usePatchCategoryMutation__
 *
 * To run a mutation, you first call `usePatchCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePatchCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [patchCategoryMutation, { data, loading, error }] = usePatchCategoryMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePatchCategoryMutation(baseOptions?: Apollo.MutationHookOptions<PatchCategoryMutation, PatchCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PatchCategoryMutation, PatchCategoryMutationVariables>(PatchCategoryDocument, options);
      }
export type PatchCategoryMutationHookResult = ReturnType<typeof usePatchCategoryMutation>;
export type PatchCategoryMutationResult = Apollo.MutationResult<PatchCategoryMutation>;
export type PatchCategoryMutationOptions = Apollo.BaseMutationOptions<PatchCategoryMutation, PatchCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: String!) {
  deleteCategory(id: $id)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($infos: TagCreateEntity!) {
  createTag(infos: $infos) {
    id
    name
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const PatchTagDocument = gql`
    mutation PatchTag($infos: TagCreateEntity!, $id: String!) {
  patchTag(infos: $infos, id: $id) {
    id
  }
}
    `;
export type PatchTagMutationFn = Apollo.MutationFunction<PatchTagMutation, PatchTagMutationVariables>;

/**
 * __usePatchTagMutation__
 *
 * To run a mutation, you first call `usePatchTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePatchTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [patchTagMutation, { data, loading, error }] = usePatchTagMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePatchTagMutation(baseOptions?: Apollo.MutationHookOptions<PatchTagMutation, PatchTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PatchTagMutation, PatchTagMutationVariables>(PatchTagDocument, options);
      }
export type PatchTagMutationHookResult = ReturnType<typeof usePatchTagMutation>;
export type PatchTagMutationResult = Apollo.MutationResult<PatchTagMutation>;
export type PatchTagMutationOptions = Apollo.BaseMutationOptions<PatchTagMutation, PatchTagMutationVariables>;
export const DeleteTagDocument = gql`
    mutation DeleteTag($deleteTagId: String!) {
  deleteTag(id: $deleteTagId) {
    id
  }
}
    `;
export type DeleteTagMutationFn = Apollo.MutationFunction<DeleteTagMutation, DeleteTagMutationVariables>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      deleteTagId: // value for 'deleteTagId'
 *   },
 * });
 */
export function useDeleteTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagMutation, DeleteTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, options);
      }
export type DeleteTagMutationHookResult = ReturnType<typeof useDeleteTagMutation>;
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<DeleteTagMutation, DeleteTagMutationVariables>;
export const GetListAdDocument = gql`
    query GetListAd {
  getListAd {
    category {
      id
      name
    }
    createdAt
    description
    id
    location
    owner
    picture
    price
    slug
    tags {
      name
      id
    }
    title
  }
}
    `;

/**
 * __useGetListAdQuery__
 *
 * To run a query within a React component, call `useGetListAdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListAdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListAdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListAdQuery(baseOptions?: Apollo.QueryHookOptions<GetListAdQuery, GetListAdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListAdQuery, GetListAdQueryVariables>(GetListAdDocument, options);
      }
export function useGetListAdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListAdQuery, GetListAdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListAdQuery, GetListAdQueryVariables>(GetListAdDocument, options);
        }
export function useGetListAdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListAdQuery, GetListAdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListAdQuery, GetListAdQueryVariables>(GetListAdDocument, options);
        }
export type GetListAdQueryHookResult = ReturnType<typeof useGetListAdQuery>;
export type GetListAdLazyQueryHookResult = ReturnType<typeof useGetListAdLazyQuery>;
export type GetListAdSuspenseQueryHookResult = ReturnType<typeof useGetListAdSuspenseQuery>;
export type GetListAdQueryResult = Apollo.QueryResult<GetListAdQuery, GetListAdQueryVariables>;
export const GetAdByIdDocument = gql`
    query GetAdById($id: String!) {
  getAdById(id: $id) {
    category {
      id
      name
    }
    createdAt
    description
    id
    location
    owner
    picture
    price
    slug
    tags {
      id
      name
    }
    title
  }
}
    `;

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const GetAdBySlugDocument = gql`
    query GetAdBySlug($slug: String!) {
  getAdBySlug(slug: $slug) {
    category {
      id
      name
    }
    createdAt
    description
    id
    location
    owner
    picture
    price
    slug
    tags {
      id
      name
    }
    title
  }
}
    `;

/**
 * __useGetAdBySlugQuery__
 *
 * To run a query within a React component, call `useGetAdBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetAdBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetAdBySlugQuery, GetAdBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdBySlugQuery, GetAdBySlugQueryVariables>(GetAdBySlugDocument, options);
      }
export function useGetAdBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdBySlugQuery, GetAdBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdBySlugQuery, GetAdBySlugQueryVariables>(GetAdBySlugDocument, options);
        }
export function useGetAdBySlugSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAdBySlugQuery, GetAdBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdBySlugQuery, GetAdBySlugQueryVariables>(GetAdBySlugDocument, options);
        }
export type GetAdBySlugQueryHookResult = ReturnType<typeof useGetAdBySlugQuery>;
export type GetAdBySlugLazyQueryHookResult = ReturnType<typeof useGetAdBySlugLazyQuery>;
export type GetAdBySlugSuspenseQueryHookResult = ReturnType<typeof useGetAdBySlugSuspenseQuery>;
export type GetAdBySlugQueryResult = Apollo.QueryResult<GetAdBySlugQuery, GetAdBySlugQueryVariables>;
export const GetListCategoriesDocument = gql`
    query GetListCategories {
  getListCategories {
    id
    name
  }
}
    `;

/**
 * __useGetListCategoriesQuery__
 *
 * To run a query within a React component, call `useGetListCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetListCategoriesQuery, GetListCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListCategoriesQuery, GetListCategoriesQueryVariables>(GetListCategoriesDocument, options);
      }
export function useGetListCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListCategoriesQuery, GetListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListCategoriesQuery, GetListCategoriesQueryVariables>(GetListCategoriesDocument, options);
        }
export function useGetListCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListCategoriesQuery, GetListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListCategoriesQuery, GetListCategoriesQueryVariables>(GetListCategoriesDocument, options);
        }
export type GetListCategoriesQueryHookResult = ReturnType<typeof useGetListCategoriesQuery>;
export type GetListCategoriesLazyQueryHookResult = ReturnType<typeof useGetListCategoriesLazyQuery>;
export type GetListCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetListCategoriesSuspenseQuery>;
export type GetListCategoriesQueryResult = Apollo.QueryResult<GetListCategoriesQuery, GetListCategoriesQueryVariables>;
export const GetCategoryByIdDocument = gql`
    query GetCategoryById($id: String!) {
  getCategoryById(id: $id) {
    id
    name
    ads {
      createdAt
      description
      id
      location
      owner
      picture
      price
      slug
      tags {
        id
        name
      }
      title
      category {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
      }
export function useGetCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export function useGetCategoryByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export type GetCategoryByIdQueryHookResult = ReturnType<typeof useGetCategoryByIdQuery>;
export type GetCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdLazyQuery>;
export type GetCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetCategoryByIdSuspenseQuery>;
export type GetCategoryByIdQueryResult = Apollo.QueryResult<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;
export const GetListTagsDocument = gql`
    query GetListTags {
  getListTags {
    id
    name
  }
}
    `;

/**
 * __useGetListTagsQuery__
 *
 * To run a query within a React component, call `useGetListTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetListTagsQuery, GetListTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListTagsQuery, GetListTagsQueryVariables>(GetListTagsDocument, options);
      }
export function useGetListTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListTagsQuery, GetListTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListTagsQuery, GetListTagsQueryVariables>(GetListTagsDocument, options);
        }
export function useGetListTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListTagsQuery, GetListTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListTagsQuery, GetListTagsQueryVariables>(GetListTagsDocument, options);
        }
export type GetListTagsQueryHookResult = ReturnType<typeof useGetListTagsQuery>;
export type GetListTagsLazyQueryHookResult = ReturnType<typeof useGetListTagsLazyQuery>;
export type GetListTagsSuspenseQueryHookResult = ReturnType<typeof useGetListTagsSuspenseQuery>;
export type GetListTagsQueryResult = Apollo.QueryResult<GetListTagsQuery, GetListTagsQueryVariables>;
export const GetTagByIdDocument = gql`
    query GetTagById($getTagByIdId: String!) {
  getTagById(id: $getTagByIdId) {
    id
    name
  }
}
    `;

/**
 * __useGetTagByIdQuery__
 *
 * To run a query within a React component, call `useGetTagByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagByIdQuery({
 *   variables: {
 *      getTagByIdId: // value for 'getTagByIdId'
 *   },
 * });
 */
export function useGetTagByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTagByIdQuery, GetTagByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagByIdQuery, GetTagByIdQueryVariables>(GetTagByIdDocument, options);
      }
export function useGetTagByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagByIdQuery, GetTagByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagByIdQuery, GetTagByIdQueryVariables>(GetTagByIdDocument, options);
        }
export function useGetTagByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTagByIdQuery, GetTagByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTagByIdQuery, GetTagByIdQueryVariables>(GetTagByIdDocument, options);
        }
export type GetTagByIdQueryHookResult = ReturnType<typeof useGetTagByIdQuery>;
export type GetTagByIdLazyQueryHookResult = ReturnType<typeof useGetTagByIdLazyQuery>;
export type GetTagByIdSuspenseQueryHookResult = ReturnType<typeof useGetTagByIdSuspenseQuery>;
export type GetTagByIdQueryResult = Apollo.QueryResult<GetTagByIdQuery, GetTagByIdQueryVariables>;