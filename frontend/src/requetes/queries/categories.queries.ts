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
  query GetCategoryById($id: String!, $limit: Float, $skip: Float) {
    getCategoryById(id: $id, limit: $limit, skip: $skip) {
      id
      name
      count
      category {
        id
        name
      }
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
      }
    }
  }
`;
