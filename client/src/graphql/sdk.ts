import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type CreatePostInput = {
  author: Scalars['String'];
  avatarImage?: InputMaybe<Scalars['String']>;
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
  author: Scalars['ID'];
  avatarImage?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  categories: Array<Scalars['String']>;
  likes: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getPostByAuthorId?: Maybe<Post>;
  getPosts: Array<Post>;
  getUserById?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetPostByAuthorIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
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

export type CreatePostMutationVariables = Exact<{
  postInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', author: string, body: string, categories: Array<string>, likes: number } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', author: string, avatarImage?: string | null, body: string, categories: Array<string>, likes: number }> };

export type GetUserByIdQueryVariables = Exact<{
  getUserByIdId: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', username?: string | null, email: string } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', username?: string | null, email: string }> };


export const CreateUserDocument = gql`
    mutation CreateUser($userInput: CreateUserInput!) {
  createUser(UserInput: $userInput) {
    username
    email
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId)
}
    `;
export const ProviderAuthUserDocument = gql`
    mutation ProviderAuthUser($userInput: AuthUserInput!) {
  providerAuthUser(UserInput: $userInput)
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($postInput: CreatePostInput!) {
  createPost(PostInput: $postInput) {
    author
    body
    categories
    likes
  }
}
    `;
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    author
    avatarImage
    body
    categories
    likes
  }
}
    `;
export const GetUserByIdDocument = gql`
    query GetUserById($getUserByIdId: String!) {
  getUserById(id: $getUserByIdId) {
    username
    email
  }
}
    `;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    username
    email
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    DeleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUser', 'mutation');
    },
    ProviderAuthUser(variables: ProviderAuthUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProviderAuthUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProviderAuthUserMutation>(ProviderAuthUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProviderAuthUser', 'mutation');
    },
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePost', 'mutation');
    },
    GetPosts(variables?: GetPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostsQuery>(GetPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPosts', 'query');
    },
    GetUserById(variables: GetUserByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByIdQuery>(GetUserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserById', 'query');
    },
    GetUsers(variables?: GetUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsers', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;