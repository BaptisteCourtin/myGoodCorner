import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query getListCategories {
    getListCategories {
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
        title
        tags {
          id
          name
        }
      }
    }
  }
`;
