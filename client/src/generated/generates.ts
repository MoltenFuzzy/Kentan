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

export type CreateUserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  UserInput: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUserById?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  username: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  userInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', username: string, email: string } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type GetUserByIdQueryVariables = Exact<{
  getUserByIdId: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', username: string, email: string } | null };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', username: string, email: string }> };


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
export const GetUserByIdDocument = `
    query GetUserById($getUserByIdId: String!) {
  getUserById(id: $getUserByIdId) {
    username
    email
  }
}
    `;
export const useGetUserByIdQuery = <
      TData = GetUserByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserByIdQueryVariables,
      options?: UseQueryOptions<GetUserByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserByIdQuery, TError, TData>(
      ['GetUserById', variables],
      fetcher<GetUserByIdQuery, GetUserByIdQueryVariables>(client, GetUserByIdDocument, variables, headers),
      options
    );
export const QueryDocument = `
    query Query {
  getUsers {
    username
    email
  }
}
    `;
export const useQueryQuery = <
      TData = QueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: QueryQueryVariables,
      options?: UseQueryOptions<QueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<QueryQuery, TError, TData>(
      variables === undefined ? ['Query'] : ['Query', variables],
      fetcher<QueryQuery, QueryQueryVariables>(client, QueryDocument, variables, headers),
      options
    );