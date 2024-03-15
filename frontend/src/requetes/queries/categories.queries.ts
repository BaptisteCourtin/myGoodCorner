import { gql } from "@apollo/client";

export const GET_LIST_CATEGORIES = gql`
  query GetListCategories {
    getListCategories {
      id
      name
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById(
    $getCategoryByIdId: String!
    $limit: Float
    $skip: Float
  ) {
    getCategoryById(id: $getCategoryByIdId, limit: $limit, skip: $skip) {
      ads {
        createdAt
        description
        id
        owner
        location
        picture
        price
        slug
        tags {
          name
          id
        }
        title
      }
      category {
        name
        id
      }
    }
  }
`;
