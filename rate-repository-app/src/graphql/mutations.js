import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
mutation CreateReview($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
  createReview(review: {ownerName: $ownerName, repositoryName: $repositoryName, rating: $rating, text: $text}) {
    id
    userId
    repositoryId
    rating
    createdAt
    text
  }
}
`;