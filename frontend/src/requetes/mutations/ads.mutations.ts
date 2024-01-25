import { gql } from "@apollo/client";

export const CREATE_AD = gql`
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

export const PATCH_AD = gql`
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

export const DELETE_AD = gql`
  mutation DeleteAd($id: String!) {
    deleteAd(id: $id) {
      id
    }
  }
`;
