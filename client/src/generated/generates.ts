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
  avatarImage: Scalars['String'];
  name: Scalars['String'];
};

export type CreateAuthorInput = {
  _id: Scalars['ID'];
  avatarImage?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreatePostInput = {
  author: CreateAuthorInput;
  body: Scalars['String'];
  likes: Scalars['Float'];
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
  deleteUser: Scalars['Boolean'];
  loginUser: LoginResponse;
  providerAuthUser: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  PostInput: CreatePostInput;
};


export type MutationCreateUserArgs = {
  UserInput: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationProviderAuthUserArgs = {
  UserInput: AuthUserInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  author: Author;
  body: Scalars['String'];
  categories: Array<Scalars['String']>;
  likes: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  postByAuthorId?: Maybe<Post>;
  posts: Array<Post>;
  /** get user by object id */
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostByAuthorIdArgs = {
  id: Scalars['String'];
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


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', body: string, likes: number, _id: string, categories: Array<string>, author: { __typename?: 'Author', _id: string, name: string, avatarImage: string } } };

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

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', body: string, likes: number, author: { __typename?: 'Author', avatarImage: string, name: string } }> };

export type PostsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsAllQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: string, categories: Array<string>, body: string, likes: number, author: { __typename?: 'Author', _id: string, avatarImage: string, name: string } }> };

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
    likes
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
export const PostsDocument = `
    query Posts {
  posts {
    body
    likes
    author {
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
      variables?: PostsQueryVariables,
      options?: UseQueryOptions<PostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsQuery, TError, TData>(
      variables === undefined ? ['Posts'] : ['Posts', variables],
      fetcher<PostsQuery, PostsQueryVariables>(client, PostsDocument, variables, headers),
      options
    );
export const PostsAllDocument = `
    query PostsAll {
  posts {
    _id
    categories
    body
    likes
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