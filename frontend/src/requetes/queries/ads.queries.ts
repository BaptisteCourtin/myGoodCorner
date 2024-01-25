import { gql } from "@apollo/client";

export const GET_LIST_ADS = gql`
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

export const GET_AD_BY_ID = gql`
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

export const GET_AD_BY_SLUG = gql`
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
