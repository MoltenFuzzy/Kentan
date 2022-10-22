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
  test: Scalars['ID'];
};

export type CreateAuthorInput = {
  _id: Scalars['ID'];
  avatarImage?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
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
  createPost: Post;
  createUser: User;
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  likePost: Post;
  loginUser: LoginResponse;
  providerAuthUser: Scalars['ID'];
  unlikePost: Post;
  updatePost: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  PostInput: CreatePostInput;
};


export type MutationCreateUserArgs = {
  UserInput: CreateUserInput;
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


export type MutationUpdatePostArgs = {
  PostInput: CreatePostInput;
  id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  author: Author;
  body: Scalars['String'];
  categories: Array<Scalars['String']>;
  comments: Array<Comment>;
  commentsCount: Scalars['Float'];
  likedByUsers?: Maybe<Array<Scalars['ID']>>;
  likesCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  postByPostId?: Maybe<Post>;
  postByUserId?: Maybe<Post>;
  posts: Array<Post>;
  /** get user by object id */
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostByPostIdArgs = {
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
  email: Scalars['String'];
  name: Scalars['String'];
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

export type PostByPostIdQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostByPostIdQuery = { __typename?: 'Query', postByPostId?: { __typename?: 'Post', _id: string, body: string, likedByUsers?: Array<string> | null, likesCount: number, commentsCount: number, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null }, comments: Array<{ __typename?: 'Comment', _id: string, body: string, test: string, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null } }> } | null };

export type PostByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type PostByUserIdQuery = { __typename?: 'Query', postByUserId?: { __typename?: 'Post', _id: string, body: string, author: { __typename?: 'Author', _id: string, name: string, avatarImage?: string | null } } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Float'];
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: string, body: string, likesCount: number, likedByUsers?: Array<string> | null, commentsCount: number, author: { __typename?: 'Author', _id: string, avatarImage?: string | null, name: string } }> };

export type PostsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsAllQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: string, categories: Array<string>, body: string, likesCount: number, author: { __typename?: 'Author', _id: string, avatarImage?: string | null, name: string } }> };

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, name: string, username?: string | null, avatar: string, email: string } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: string, name: string, username?: string | null, email: string, avatar: string }> };


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
export const PostByPostIdDocument = `
    query PostByPostId($postId: String!) {
  postByPostId(postId: $postId) {
    _id
    body
    likedByUsers
    likesCount
    author {
      _id
      name
      avatarImage
    }
    commentsCount
    comments {
      _id
      body
      test
      author {
        _id
        name
        avatarImage
      }
    }
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