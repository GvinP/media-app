import {useMutation, useQuery} from '@apollo/client';
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  GetCommentQueryVariables,
  GetPostQuery,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {createComment, getPost, updatePost} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';

const useCommentService = (postId: string) => {
  const {userId} = useAuthContext();
  const {data: postData} = useQuery<GetPostQuery, GetCommentQueryVariables>(
    getPost,
    {variables: {id: postId}},
  );
  const post = postData?.getPost;
  const [doCreateComment] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(createComment);
  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const incrementNofComments = (amount: 1 | -1) => {
    if (!post) {
      return;
    }
    doUpdatePost({
      variables: {
        input: {
          id: post?.id,
          _version: post?._version,
          nofComments: post?.nofComments + amount,
        },
      },
    });
  };

  const onCreateComment = async (newComment: string) => {
    if (!post) {
      return;
    }
    try {
      if (newComment.trim()) {
        await doCreateComment({
          variables: {
            input: {comment: newComment, postID: post?.id, userID: userId},
          },
        });
        incrementNofComments(1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {incrementNofComments, onCreateComment};
};

export default useCommentService;
