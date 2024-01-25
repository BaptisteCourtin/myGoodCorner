import { gql } from "@apollo/client";

export const GET_LIST_TAGS = gql`
  query GetListTags {
    getListTags {
      id
      name
    }
  }
`;

export const GET_TAGS_BY_ID = gql`
  query GetTagById($getTagByIdId: String!) {
    getTagById(id: $getTagByIdId) {
      id
      name
    }
  }
`;
