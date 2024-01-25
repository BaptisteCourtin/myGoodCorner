import { gql } from "@apollo/client";

export const CREATE_TAG = gql`
  mutation CreateTag($infos: TagCreateEntity!) {
    createTag(infos: $infos) {
      id
      name
    }
  }
`;

export const PATCH_TAG = gql`
  mutation PatchTag($infos: TagCreateEntity!, $id: String!) {
    patchTag(infos: $infos, id: $id) {
      id
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($deleteTagId: String!) {
    deleteTag(id: $deleteTagId) {
      id
    }
  }
`;
