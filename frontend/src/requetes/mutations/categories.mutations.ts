import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($infos: CategoryCreateEntity!) {
    createCategory(infos: $infos) {
      id
      name
    }
  }
`;

export const PATCH_CATEGORY = gql`
  mutation PatchCategory($infos: CategoryUpdateEntity!, $id: String!) {
    patchCategory(infos: $infos, id: $id) {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;
