import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Author = {
  __typename?: 'Author';
  _id: Scalars['ID'];
  avatarImage?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  author: Author;
  body: Scalars['String'];
  commentsCount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  likedByUsers?: Maybe<Array<Scalars['ID']>>;
  likesCount: Scalars['Float'];
  postId?: Maybe<PostUnion>;
  updatedAt: Scalars['DateTime'];
};

export type CommentId = {
  __typename?: 'CommentId';
  _id: Scalars['ID'];
};

export type CommentUnion = Comment | CommentId;

export type CreateAuthorInput = {
  _id: Scalars['ID'];
  avatarImage?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateCommentInput = {
  author: CreateAuthorInput;
  body: Scalars['String'];
  postId: CreatePostIdInput;
};

export type CreatePostIdInput = {
  _id: Scalars['ID'];
};

export type CreatePostInput = {
  author: CreateAuthorInput;
  body: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createUser: User;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  likePost: Post;
  loginUser: LoginResponse;
  providerAuthUser: Scalars['ID'];
  unlikePost: Post;
  updateComment: Comment;
  updatePost: Scalars['Boolean'];
};


export type MutationCreateCommentArgs = {
  CommentInput: CreateCommentInput;
  populate?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreatePostArgs = {
  PostInput: CreatePostInput;
};


export type MutationCreateUserArgs = {
  UserInput: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLikePostArgs = {
  id: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationProviderAuthUserArgs = {
  UserInput: AuthUserInput;
};


export type MutationUnlikePostArgs = {
  id: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  PostInput: CreatePostInput;
  id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  author: Author;
  body: Scalars['ID'];
  categories: Array<Scalars['String']>;
  comments: Array<CommentUnion>;
  commentsCount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  likedByUsers?: Maybe<Array<Scalars['ID']>>;
  likesCount: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type PostId = {
  __typename?: 'PostId';
  _id: Scalars['ID'];
};

export type PostUnion = Post | PostId;

export type Query = {
  __typename?: 'Query';
  commentById: Comment;
  commentsByPostId: Array<Comment>;
  commentsByUserId: Array<Comment>;
  postByPostId?: Maybe<Post>;
  postByUserId?: Maybe<Post>;
  posts: Array<Post>;
  /** get user by object id */
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCommentByIdArgs = {
  id: Scalars['String'];
  populate?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCommentsByPostIdArgs = {
  postId: Scalars['String'];
};


export type QueryCommentsByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryPostByPostIdArgs = {
  populateComments: Scalars['Boolean'];
  postId: Scalars['String'];
};


export type QueryPostByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
};

export type CreatePostMutationVariables = Exact<{
  postInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', body: string, likesCount: number, _id: string, categories: Array<string>, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null } } };

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type CreateUserMutationVariables = Exact<{
  userInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', username?: string | null, email: string } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type ProviderAuthUserMutationVariables = Exact<{
  userInput: AuthUserInput;
}>;


export type ProviderAuthUserMutation = { __typename?: 'Mutation', providerAuthUser: string };

export type LikePostMutationVariables = Exact<{
  userId: Scalars['String'];
  postId: Scalars['String'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'Post', likedByUsers?: Array<string> | null, likesCount: number } };

export type UnlikePostMutationVariables = Exact<{
  userId: Scalars['String'];
  postId: Scalars['String'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost: { __typename?: 'Post', likesCount: number, likedByUsers?: Array<string> | null } };

export type CreateCommentMutationVariables = Exact<{
  commentInput: CreateCommentInput;
  populate?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', _id: string, body: string, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null } } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type PostByPostIdQueryVariables = Exact<{
  postId: Scalars['String'];
  populateComments: Scalars['Boolean'];
}>;


export type PostByPostIdQuery = { __typename?: 'Query', postByPostId?: { __typename?: 'Post', body: string, _id: string, categories: Array<string>, commentsCount: number, likedByUsers?: Array<string> | null, likesCount: number, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null }, comments: Array<{ __typename?: 'Comment', _id: string, body: string, likesCount: number, likedByUsers?: Array<string> | null, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null } } | { __typename?: 'CommentId', _id: string }> } | null };

export type PostByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type PostByUserIdQuery = { __typename?: 'Query', postByUserId?: { __typename?: 'Post', _id: string, body: string, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null } } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Float'];
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: string, body: string, likesCount: number, likedByUsers?: Array<string> | null, commentsCount: number, author: { __typename?: 'Author', _id: string, avatarImage?: string | null, name: string }, comments: Array<{ __typename?: 'Comment' } | { __typename?: 'CommentId', _id: string }> }> };

export type PostsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsAllQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: string, categories: Array<string>, body: string, likesCount: number, author: { __typename?: 'Author', _id: string, avatarImage?: string | null, name: string } }> };

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, name: string, username?: string | null, avatar: string, email: string } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: string, name: string, username?: string | null, email: string, avatar: string }> };

export type CommentByIdQueryVariables = Exact<{
  commentByIdId2: Scalars['String'];
  commentByIdPopulate2?: InputMaybe<Scalars['Boolean']>;
}>;


export type CommentByIdQuery = { __typename?: 'Query', commentById: { __typename?: 'Comment', _id: string, body: string, commentsCount: number, likedByUsers?: Array<string> | null, likesCount: number, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null }, postId?: { __typename?: 'Post', _id: string, body: string, categories: Array<string>, commentsCount: number, likedByUsers?: Array<string> | null, likesCount: number } | { __typename?: 'PostId', _id: string } | null } };

export type CommentsByPostIdQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type CommentsByPostIdQuery = { __typename?: 'Query', commentsByPostId: Array<{ __typename?: 'Comment', _id: string, body: string, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null } }> };


export const CreatePostDocument = `
    mutation CreatePost($postInput: CreatePostInput!) {
  createPost(PostInput: $postInput) {
    author {
      _id
      name
      avatarImage
    }
    body
    likesCount
    _id
    categories
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['CreatePost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    );
export const DeletePostDocument = `
    mutation DeletePost($deletePostId: String!) {
  deletePost(id: $deletePostId)
}
    `;
export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      ['DeletePost'],
      (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables, headers)(),
      options
    );
export const CreateUserDocument = `
    mutation CreateUser($userInput: CreateUserInput!) {
  createUser(UserInput: $userInput) {
    username
    email
  }
}
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
      options
    );
export const DeleteUserDocument = `
    mutation DeleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId)
}
    `;
export const useDeleteUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>(
      ['DeleteUser'],
      (variables?: DeleteUserMutationVariables) => fetcher<DeleteUserMutation, DeleteUserMutationVariables>(client, DeleteUserDocument, variables, headers)(),
      options
    );
export const ProviderAuthUserDocument = `
    mutation ProviderAuthUser($userInput: AuthUserInput!) {
  providerAuthUser(UserInput: $userInput)
}
    `;
export const useProviderAuthUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ProviderAuthUserMutation, TError, ProviderAuthUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ProviderAuthUserMutation, TError, ProviderAuthUserMutationVariables, TContext>(
      ['ProviderAuthUser'],
      (variables?: ProviderAuthUserMutationVariables) => fetcher<ProviderAuthUserMutation, ProviderAuthUserMutationVariables>(client, ProviderAuthUserDocument, variables, headers)(),
      options
    );
export const LikePostDocument = `
    mutation LikePost($userId: String!, $postId: String!) {
  likePost(userId: $userId, id: $postId) {
    likedByUsers
    likesCount
  }
}
    `;
export const useLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LikePostMutation, TError, LikePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
      ['LikePost'],
      (variables?: LikePostMutationVariables) => fetcher<LikePostMutation, LikePostMutationVariables>(client, LikePostDocument, variables, headers)(),
      options
    );
export const UnlikePostDocument = `
    mutation UnlikePost($userId: String!, $postId: String!) {
  unlikePost(userId: $userId, id: $postId) {
    likesCount
    likedByUsers
  }
}
    `;
export const useUnlikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UnlikePostMutation, TError, UnlikePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UnlikePostMutation, TError, UnlikePostMutationVariables, TContext>(
      ['UnlikePost'],
      (variables?: UnlikePostMutationVariables) => fetcher<UnlikePostMutation, UnlikePostMutationVariables>(client, UnlikePostDocument, variables, headers)(),
      options
    );
export const CreateCommentDocument = `
    mutation CreateComment($commentInput: CreateCommentInput!, $populate: Boolean) {
  createComment(CommentInput: $commentInput, populate: $populate) {
    _id
    body
    author {
      _id
      name
      avatarImage
    }
  }
}
    `;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['CreateComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    );
export const DeleteCommentDocument = `
    mutation DeleteComment($deleteCommentId: String!) {
  deleteComment(id: $deleteCommentId)
}
    `;
export const useDeleteCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>(
      ['DeleteComment'],
      (variables?: DeleteCommentMutationVariables) => fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(client, DeleteCommentDocument, variables, headers)(),
      options
    );
export const PostByPostIdDocument = `
    query PostByPostId($postId: String!, $populateComments: Boolean!) {
  postByPostId(postId: $postId, populateComments: $populateComments) {
    body
    _id
    author {
      _id
      name
      avatarImage
    }
    categories
    comments {
      ... on Comment {
        _id
        body
        author {
          _id
          name
          avatarImage
        }
        likesCount
        likedByUsers
      }
      ... on CommentId {
        _id
      }
    }
    commentsCount
    likedByUsers
    likesCount
  }
}
    `;
export const usePostByPostIdQuery = <
      TData = PostByPostIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostByPostIdQueryVariables,
      options?: UseQueryOptions<PostByPostIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostByPostIdQuery, TError, TData>(
      ['PostByPostId', variables],
      fetcher<PostByPostIdQuery, PostByPostIdQueryVariables>(client, PostByPostIdDocument, variables, headers),
      options
    );
export const PostByUserIdDocument = `
    query PostByUserId($userId: String!) {
  postByUserId(userId: $userId) {
    _id
    body
    author {
      _id
      name
      avatarImage
    }
  }
}
    `;
export const usePostByUserIdQuery = <
      TData = PostByUserIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostByUserIdQueryVariables,
      options?: UseQueryOptions<PostByUserIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostByUserIdQuery, TError, TData>(
      ['PostByUserId', variables],
      fetcher<PostByUserIdQuery, PostByUserIdQueryVariables>(client, PostByUserIdDocument, variables, headers),
      options
    );
export const PostsDocument = `
    query Posts($limit: Float!) {
  posts(limit: $limit) {
    _id
    body
    likesCount
    likedByUsers
    commentsCount
    author {
      _id
      avatarImage
      name
    }
    comments {
      ... on CommentId {
        _id
      }
    }
  }
}
    `;
export const usePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostsQueryVariables,
      options?: UseQueryOptions<PostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsQuery, TError, TData>(
      ['Posts', variables],
      fetcher<PostsQuery, PostsQueryVariables>(client, PostsDocument, variables, headers),
      options
    );
export const PostsAllDocument = `
    query PostsAll {
  posts {
    _id
    categories
    body
    likesCount
    author {
      _id
      avatarImage
      name
    }
  }
}
    `;
export const usePostsAllQuery = <
      TData = PostsAllQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PostsAllQueryVariables,
      options?: UseQueryOptions<PostsAllQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsAllQuery, TError, TData>(
      variables === undefined ? ['PostsAll'] : ['PostsAll', variables],
      fetcher<PostsAllQuery, PostsAllQueryVariables>(client, PostsAllDocument, variables, headers),
      options
    );
export const UserDocument = `
    query User($userId: String!) {
  user(id: $userId) {
    _id
    name
    username
    avatar
    email
  }
}
    `;
export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserQueryVariables,
      options?: UseQueryOptions<UserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserQuery, TError, TData>(
      ['User', variables],
      fetcher<UserQuery, UserQueryVariables>(client, UserDocument, variables, headers),
      options
    );
export const UsersDocument = `
    query Users {
  users {
    _id
    name
    username
    email
    avatar
  }
}
    `;
export const useUsersQuery = <
      TData = UsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UsersQueryVariables,
      options?: UseQueryOptions<UsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UsersQuery, TError, TData>(
      variables === undefined ? ['Users'] : ['Users', variables],
      fetcher<UsersQuery, UsersQueryVariables>(client, UsersDocument, variables, headers),
      options
    );
export const CommentByIdDocument = `
    query CommentById($commentByIdId2: String!, $commentByIdPopulate2: Boolean) {
  commentById(id: $commentByIdId2, populate: $commentByIdPopulate2) {
    _id
    author {
      _id
      name
      avatarImage
    }
    postId {
      ... on PostId {
        _id
      }
      ... on Post {
        _id
        body
        categories
        commentsCount
        likedByUsers
        likesCount
      }
    }
    body
    commentsCount
    likedByUsers
    likesCount
  }
}
    `;
export const useCommentByIdQuery = <
      TData = CommentByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CommentByIdQueryVariables,
      options?: UseQueryOptions<CommentByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CommentByIdQuery, TError, TData>(
      ['CommentById', variables],
      fetcher<CommentByIdQuery, CommentByIdQueryVariables>(client, CommentByIdDocument, variables, headers),
      options
    );
export const CommentsByPostIdDocument = `
    query CommentsByPostId($postId: String!) {
  commentsByPostId(postId: $postId) {
    _id
    body
    author {
      _id
      name
      avatarImage
    }
  }
}
    `;
export const useCommentsByPostIdQuery = <
      TData = CommentsByPostIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CommentsByPostIdQueryVariables,
      options?: UseQueryOptions<CommentsByPostIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CommentsByPostIdQuery, TError, TData>(
      ['CommentsByPostId', variables],
      fetcher<CommentsByPostIdQuery, CommentsByPostIdQueryVariables>(client, CommentsByPostIdDocument, variables, headers),
      options
    );