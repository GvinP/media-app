import {useMutation, useQuery} from '@apollo/client';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {
  createLike,
  deleteLike as deleteLikeQuery,
  likesForPostByUser,
  updatePost,
} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';

const useLikeService = (post: Post) => {
  const {userId} = useAuthContext();
  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);
  const [doCreateLike] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: {input: {userID: userId, postID: post.id}},
    refetchQueries: ['LikesForPostByUser'],
  });
  const [doDeleteLike] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLikeQuery, {refetchQueries: ['LikesForPostByUser']});
  const incrementNofLikes = (amount: 1 | -1) =>
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofLikes: post.nofLikes + amount,
        },
      },
    });
  const {data: usersLikes} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID: post.id, userID: {eq: userId}}});
  const userLike = (usersLikes?.likesForPostByUser?.items || []).filter(
    like => !like?._deleted,
  )?.[0];
  const addLike = () => {
    doCreateLike();
    incrementNofLikes(1);
  };
  const deleteLike = () => {
    if (userLike) {
      doDeleteLike({
        variables: {input: {id: userLike.id, _version: userLike._version}},
      });
      incrementNofLikes(-1);
    }
  };
  const toggleLike = () => {
    if (userLike) {
      deleteLike();
    } else {
      addLike();
    }
  };
  return {
    userLike,
    toggleLike,
  };
};

export default useLikeService;
