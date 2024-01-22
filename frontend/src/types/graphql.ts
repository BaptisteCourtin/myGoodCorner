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
  tags: TagEntity;
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

export type Mutation = {
  __typename?: 'Mutation';
  createAd: AdEntity;
  createCategory: CategoryEntity;
  createTag: TagEntity;
  deleteAd: Array<AdEntity>;
  deleteCategory: Array<CategoryEntity>;
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
  infos: CategoryCreateEntity;
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

export type GetListCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListCategoriesQuery = { __typename?: 'Query', getListCategories: Array<{ __typename?: 'CategoryEntity', id: string, name: string }> };


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