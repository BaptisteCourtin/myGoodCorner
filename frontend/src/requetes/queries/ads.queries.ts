import { gql } from "@apollo/client";

export const LIST_ADS_BY_CATEGORY_ID = gql`
  query ListAdsByCategory($listAdsByCategoryId: String!) {
    listAdsByCategory(id: $listAdsByCategoryId) {
      id
      picture
      price
      title
    }
  }
`;

export const FIND_AD_BY_ID = gql`
  query FindAdById($findAdById: String!) {
    findAdById(id: $findAdById) {
      title
      description
      price
    }
  }
`;

export const FIND_FOR_EDIT_AD_BY_ID = gql`
  query FindForEditAdById($findAdById: String!) {
    findAdById(id: $findAdById) {
      id
      title
      description
      owner
      price
      location
      picture
      createdAt
      updatedAt
      category {
        id
      }
    }
  }
`;

export const LIST_ADS_WITH_FILTER = gql`
  query ListAdsWithFilter($filter: FilterAd!) {
    listAdsWithFilter(filter: $filter) {
      title
      id
      category {
        name
        id
      }
    }
  }
`;
