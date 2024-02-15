import { gql } from "@apollo/client";

export const ALL_REPOSITORIES = gql`
  query Repositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        cursor
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
      pageInfo{
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const SINGLE_REPOSITORY = gql`
query Repository($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
    reviews(first: $first, after: $after) {
      edges{
        cursor
        node{
          id
          text
          rating
          createdAt
          user{
            id
            username
          }
        }
      }
      pageInfo{
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
}
`;

export const ME = gql`
query Me($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          repository{
            fullName
          }
          user{
            id
            username
          }
        }
      }
    }
  }
}
`;