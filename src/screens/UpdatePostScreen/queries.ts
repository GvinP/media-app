import {gql} from '@apollo/client';

export const updatePost = gql`
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

export const getPost = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      description
      image
      images
      video
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
