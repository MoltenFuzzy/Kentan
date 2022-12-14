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
  /** followerId is the user that is following the user */
  followUser: Scalars['Boolean'];
  likePost: Post;
  loginUser: LoginResponse;
  providerAuthUser: Scalars['ID'];
  /** followerId is the user that is following the user */
  unfollowUser: Scalars['Boolean'];
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


export type MutationFollowUserArgs = {
  followerId: Scalars['String'];
  userId: Scalars['String'];
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


export type MutationUnfollowUserArgs = {
  followerId: Scalars['String'];
  userId: Scalars['String'];
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
  /** user's background image */
  banner?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  followers?: Maybe<Array<Scalars['ID']>>;
  followersCount: Scalars['Float'];
  following?: Maybe<Array<Scalars['ID']>>;
  followingCount: Scalars['Float'];
  name: Scalars['String'];
  posts?: Maybe<Array<Scalars['ID']>>;
  postsCount: Scalars['Float'];
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

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

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


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, name: string, username?: string | null, avatar: string, email: string, followers?: Array<string> | null, followersCount: number } | null };

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


export const CreatePostDocument = gql`
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
export const DeletePostDocument = gql`
    mutation DeletePost($deletePostId: String!) {
  deletePost(id: $deletePostId)
}
    `;
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
export const LikePostDocument = gql`
    mutation LikePost($userId: String!, $postId: String!) {
  likePost(userId: $userId, id: $postId) {
    likedByUsers
    likesCount
  }
}
    `;
export const UnlikePostDocument = gql`
    mutation UnlikePost($userId: String!, $postId: String!) {
  unlikePost(userId: $userId, id: $postId) {
    likesCount
    likedByUsers
  }
}
    `;
export const CreateCommentDocument = gql`
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
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: String!) {
  deleteComment(id: $deleteCommentId)
}
    `;
export const FollowUserDocument = gql`
    mutation FollowUser($userId: String!, $followerId: String!) {
  followUser(userId: $userId, followerId: $followerId)
}
    `;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($userId: String!, $followerId: String!) {
  unfollowUser(userId: $userId, followerId: $followerId)
}
    `;
export const PostByPostIdDocument = gql`
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
export const PostByUserIdDocument = gql`
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
export const PostsDocument = gql`
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
export const PostsAllDocument = gql`
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
export const UserDocument = gql`
    query User($userId: String!) {
  user(id: $userId) {
    _id
    name
    username
    avatar
    email
    followers
    followersCount
  }
}
    `;
export const UsersDocument = gql`
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
export const CommentByIdDocument = gql`
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
export const CommentsByPostIdDocument = gql`
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePost', 'mutation');
    },
    DeletePost(variables: DeletePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePostMutation>(DeletePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeletePost', 'mutation');
    },
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    DeleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUser', 'mutation');
    },
    ProviderAuthUser(variables: ProviderAuthUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProviderAuthUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProviderAuthUserMutation>(ProviderAuthUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProviderAuthUser', 'mutation');
    },
    LikePost(variables: LikePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LikePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LikePostMutation>(LikePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LikePost', 'mutation');
    },
    UnlikePost(variables: UnlikePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnlikePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnlikePostMutation>(UnlikePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UnlikePost', 'mutation');
    },
    CreateComment(variables: CreateCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCommentMutation>(CreateCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateComment', 'mutation');
    },
    DeleteComment(variables: DeleteCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCommentMutation>(DeleteCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteComment', 'mutation');
    },
    FollowUser(variables: FollowUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FollowUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FollowUserMutation>(FollowUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FollowUser', 'mutation');
    },
    UnfollowUser(variables: UnfollowUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnfollowUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnfollowUserMutation>(UnfollowUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UnfollowUser', 'mutation');
    },
    PostByPostId(variables: PostByPostIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostByPostIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostByPostIdQuery>(PostByPostIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PostByPostId', 'query');
    },
    PostByUserId(variables: PostByUserIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostByUserIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostByUserIdQuery>(PostByUserIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PostByUserId', 'query');
    },
    Posts(variables: PostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsQuery>(PostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Posts', 'query');
    },
    PostsAll(variables?: PostsAllQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostsAllQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsAllQuery>(PostsAllDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PostsAll', 'query');
    },
    User(variables: UserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserQuery>(UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'User', 'query');
    },
    Users(variables?: UsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersQuery>(UsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Users', 'query');
    },
    CommentById(variables: CommentByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CommentByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CommentByIdQuery>(CommentByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CommentById', 'query');
    },
    CommentsByPostId(variables: CommentsByPostIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CommentsByPostIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CommentsByPostIdQuery>(CommentsByPostIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CommentsByPostId', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;