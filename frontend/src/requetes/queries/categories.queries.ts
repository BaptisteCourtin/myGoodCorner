import { gql } from "@apollo/client";

export const GET_LIST_CATEGORIES = gql`
  query GetListCategories {
    getListCategories {
      id
      name
    }
  }
`;
