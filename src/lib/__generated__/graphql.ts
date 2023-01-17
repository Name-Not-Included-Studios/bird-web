import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '../graphql-fetcher';
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

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Content = {
  __typename?: 'Content';
  content?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Removed "PostInput!" because we don't want to have editable post bodies | Added annotation parameter */
  annotatePost?: Maybe<Post>;
  createAccount?: Maybe<LoginResponse>;
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  followUser?: Maybe<User>;
  likePost?: Maybe<Post>;
  login?: Maybe<LoginResponse>;
  unfollowUser?: Maybe<User>;
  unlikePost?: Maybe<Post>;
  /**  Changed Return type of "User" to "LoginResponse" as we are basically doing the entire login procedure before changing the pw */
  updatePassword?: Maybe<LoginResponse>;
  updateUser?: Maybe<User>;
};


export type MutationAnnotatePostArgs = {
  annotation: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  auth: AuthInput;
};


export type MutationCreatePostArgs = {
  post: PostInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  auth: AuthInput;
};


export type MutationFollowUserArgs = {
  followerId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationLoginArgs = {
  auth: AuthInput;
};


export type MutationUnfollowUserArgs = {
  followerId: Scalars['ID'];
};


export type MutationUnlikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};

export type Post = {
  __typename?: 'Post';
  annotation?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  isPublished: Scalars['Boolean'];
  likesCount: Scalars['Int'];
  parentId?: Maybe<Scalars['ID']>;
  postId: Scalars['ID'];
  userId: Scalars['ID'];
};

/**  Removed :userId: ID!", I will get it from access token */
export type PostInput = {
  annotation?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  parentId?: InputMaybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  apiVersion: Scalars['ID'];
  getMe?: Maybe<User>;
  getPost?: Maybe<Post>;
  getRecentPostsFromUser?: Maybe<Array<Maybe<Post>>>;
  getTimeline?: Maybe<Array<Maybe<Post>>>;
  refresh?: Maybe<Scalars['String']>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetPostArgs = {
  postId: Scalars['ID'];
};


export type QueryGetRecentPostsFromUserArgs = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  userId: Scalars['ID'];
};


export type QueryGetTimelineArgs = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type QuerySearchUsersArgs = {
  query: UserSearchCriteria;
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  bio: Scalars['String'];
  chirpCount: Scalars['Int'];
  displayName: Scalars['String'];
  followersCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  userId: Scalars['ID'];
  username: Scalars['String'];
  websiteUrl: Scalars['String'];
};

/**  Renamed for continuity "ProfileInput" to "UserInput" */
export type UserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type UserSearchCriteria = {
  bioContains?: InputMaybe<Scalars['String']>;
  followerCountGreaterThan?: InputMaybe<Scalars['Int']>;
  followerCountLessThan?: InputMaybe<Scalars['Int']>;
  usernameContains?: InputMaybe<Scalars['String']>;
  usernameEndsWith?: InputMaybe<Scalars['String']>;
  usernameFuzzySearch?: InputMaybe<Scalars['String']>;
  usernameStartsWith?: InputMaybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  auth: AuthInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', userId: string, username: string, displayName: string, bio: string, websiteUrl: string, avatarUrl: string, chirpCount: number, followersCount: number, followingCount: number } } | null };

export type CreateAccountMutationVariables = Exact<{
  auth: AuthInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'LoginResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', userId: string, username: string, displayName: string, bio: string, websiteUrl: string, avatarUrl: string, chirpCount: number, followersCount: number, followingCount: number } } | null };

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: { __typename?: 'LoginResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', userId: string, username: string, displayName: string, bio: string, websiteUrl: string, avatarUrl: string, chirpCount: number, followersCount: number, followingCount: number } } | null };

export type UpdateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', userId: string, username: string, displayName: string, bio: string, websiteUrl: string, avatarUrl: string, chirpCount: number, followersCount: number, followingCount: number } | null };

export type DeleteUserMutationVariables = Exact<{
  auth: AuthInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: boolean | null };

export type CreatePostMutationVariables = Exact<{
  post: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', postId: string, userId: string, content: string, likesCount: number, isPublished: boolean, annotation?: string | null, parentId?: string | null } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', postId: string, userId: string, content: string, likesCount: number, isPublished: boolean, annotation?: string | null, parentId?: string | null } | null };

export type AnnotatePostMutationVariables = Exact<{
  postId: Scalars['String'];
  annotation: Scalars['String'];
}>;


export type AnnotatePostMutation = { __typename?: 'Mutation', annotatePost?: { __typename?: 'Post', postId: string, userId: string, content: string, likesCount: number, isPublished: boolean, annotation?: string | null, parentId?: string | null } | null };

export type FollowUserMutationVariables = Exact<{
  followerId: Scalars['ID'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'User', userId: string, username: string, displayName: string, bio: string, websiteUrl: string, avatarUrl: string, chirpCount: number, followersCount: number, followingCount: number } | null };

export type UnfollowUserMutationVariables = Exact<{
  followerId: Scalars['ID'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: { __typename?: 'User', userId: string, username: string, displayName: string, bio: string, websiteUrl: string, avatarUrl: string, chirpCount: number, followersCount: number, followingCount: number } | null };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'Post', postId: string, userId: string, content: string, likesCount: number, isPublished: boolean, annotation?: string | null, parentId?: string | null } | null };

export type UnlikePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost?: { __typename?: 'Post', postId: string, userId: string, content: string, likesCount: number, isPublished: boolean, annotation?: string | null, parentId?: string | null } | null };

export type GetApiVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApiVersionQuery = { __typename?: 'Query', apiVersion: string };

export type SearchUsersQueryVariables = Exact<{
  query: UserSearchCriteria;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers?: Array<{ __typename?: 'User', userId: string, username: string, displayName: string, bio: string } | null> | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe?: { __typename?: 'User', userId: string, username: string, displayName: string, bio: string, websiteUrl: string, avatarUrl: string, chirpCount: number, followersCount: number, followingCount: number } | null };

export type GetPostQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', postId: string, userId: string, content: string, likesCount: number, isPublished: boolean, annotation?: string | null, parentId?: string | null } | null };

export type GetRecentPostsFromUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetRecentPostsFromUserQuery = { __typename?: 'Query', getRecentPostsFromUser?: Array<{ __typename?: 'Post', postId: string, userId: string, content: string, likesCount: number, isPublished: boolean, annotation?: string | null, parentId?: string | null } | null> | null };

export type GetTimelineQueryVariables = Exact<{
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetTimelineQuery = { __typename?: 'Query', getTimeline?: Array<{ __typename?: 'Post', postId: string, userId: string, content: string, likesCount: number, isPublished: boolean, annotation?: string | null, parentId?: string | null } | null> | null };

export type RefreshQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshQuery = { __typename?: 'Query', refresh?: string | null };


export const LoginDocument = `
    mutation Login($auth: AuthInput!) {
  login(auth: $auth) {
    user {
      userId
      username
      displayName
      bio
      websiteUrl
      avatarUrl
      chirpCount
      followersCount
      followingCount
    }
    access_token
    refresh_token
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetchData<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
export const CreateAccountDocument = `
    mutation CreateAccount($auth: AuthInput!) {
  createAccount(auth: $auth) {
    user {
      userId
      username
      displayName
      bio
      websiteUrl
      avatarUrl
      chirpCount
      followersCount
      followingCount
    }
    access_token
    refresh_token
  }
}
    `;
export const useCreateAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateAccountMutation, TError, CreateAccountMutationVariables, TContext>) =>
    useMutation<CreateAccountMutation, TError, CreateAccountMutationVariables, TContext>(
      ['CreateAccount'],
      (variables?: CreateAccountMutationVariables) => fetchData<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, variables)(),
      options
    );
export const UpdatePasswordDocument = `
    mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
  updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    user {
      userId
      username
      displayName
      bio
      websiteUrl
      avatarUrl
      chirpCount
      followersCount
      followingCount
    }
    access_token
    refresh_token
  }
}
    `;
export const useUpdatePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdatePasswordMutation, TError, UpdatePasswordMutationVariables, TContext>) =>
    useMutation<UpdatePasswordMutation, TError, UpdatePasswordMutationVariables, TContext>(
      ['UpdatePassword'],
      (variables?: UpdatePasswordMutationVariables) => fetchData<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, variables)(),
      options
    );
export const UpdateUserDocument = `
    mutation UpdateUser($user: UserInput!) {
  updateUser(user: $user) {
    userId
    username
    displayName
    bio
    websiteUrl
    avatarUrl
    chirpCount
    followersCount
    followingCount
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetchData<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables)(),
      options
    );
export const DeleteUserDocument = `
    mutation DeleteUser($auth: AuthInput!) {
  deleteUser(auth: $auth)
}
    `;
export const useDeleteUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>) =>
    useMutation<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>(
      ['DeleteUser'],
      (variables?: DeleteUserMutationVariables) => fetchData<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, variables)(),
      options
    );
export const CreatePostDocument = `
    mutation CreatePost($post: PostInput!) {
  createPost(post: $post) {
    postId
    userId
    content
    likesCount
    isPublished
    annotation
    parentId
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['CreatePost'],
      (variables?: CreatePostMutationVariables) => fetchData<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables)(),
      options
    );
export const DeletePostDocument = `
    mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    postId
    userId
    content
    likesCount
    isPublished
    annotation
    parentId
  }
}
    `;
export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>) =>
    useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      ['DeletePost'],
      (variables?: DeletePostMutationVariables) => fetchData<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, variables)(),
      options
    );
export const AnnotatePostDocument = `
    mutation AnnotatePost($postId: String!, $annotation: String!) {
  annotatePost(postId: $postId, annotation: $annotation) {
    postId
    userId
    content
    likesCount
    isPublished
    annotation
    parentId
  }
}
    `;
export const useAnnotatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AnnotatePostMutation, TError, AnnotatePostMutationVariables, TContext>) =>
    useMutation<AnnotatePostMutation, TError, AnnotatePostMutationVariables, TContext>(
      ['AnnotatePost'],
      (variables?: AnnotatePostMutationVariables) => fetchData<AnnotatePostMutation, AnnotatePostMutationVariables>(AnnotatePostDocument, variables)(),
      options
    );
export const FollowUserDocument = `
    mutation FollowUser($followerId: ID!) {
  followUser(followerId: $followerId) {
    userId
    username
    displayName
    bio
    websiteUrl
    avatarUrl
    chirpCount
    followersCount
    followingCount
  }
}
    `;
export const useFollowUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<FollowUserMutation, TError, FollowUserMutationVariables, TContext>) =>
    useMutation<FollowUserMutation, TError, FollowUserMutationVariables, TContext>(
      ['FollowUser'],
      (variables?: FollowUserMutationVariables) => fetchData<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, variables)(),
      options
    );
export const UnfollowUserDocument = `
    mutation UnfollowUser($followerId: ID!) {
  unfollowUser(followerId: $followerId) {
    userId
    username
    displayName
    bio
    websiteUrl
    avatarUrl
    chirpCount
    followersCount
    followingCount
  }
}
    `;
export const useUnfollowUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UnfollowUserMutation, TError, UnfollowUserMutationVariables, TContext>) =>
    useMutation<UnfollowUserMutation, TError, UnfollowUserMutationVariables, TContext>(
      ['UnfollowUser'],
      (variables?: UnfollowUserMutationVariables) => fetchData<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, variables)(),
      options
    );
export const LikePostDocument = `
    mutation LikePost($postId: ID!) {
  likePost(postId: $postId) {
    postId
    userId
    content
    likesCount
    isPublished
    annotation
    parentId
  }
}
    `;
export const useLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LikePostMutation, TError, LikePostMutationVariables, TContext>) =>
    useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
      ['LikePost'],
      (variables?: LikePostMutationVariables) => fetchData<LikePostMutation, LikePostMutationVariables>(LikePostDocument, variables)(),
      options
    );
export const UnlikePostDocument = `
    mutation UnlikePost($postId: ID!) {
  unlikePost(postId: $postId) {
    postId
    userId
    content
    likesCount
    isPublished
    annotation
    parentId
  }
}
    `;
export const useUnlikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UnlikePostMutation, TError, UnlikePostMutationVariables, TContext>) =>
    useMutation<UnlikePostMutation, TError, UnlikePostMutationVariables, TContext>(
      ['UnlikePost'],
      (variables?: UnlikePostMutationVariables) => fetchData<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, variables)(),
      options
    );
export const GetApiVersionDocument = `
    query GetApiVersion {
  apiVersion
}
    `;
export const useGetApiVersionQuery = <
      TData = GetApiVersionQuery,
      TError = unknown
    >(
      variables?: GetApiVersionQueryVariables,
      options?: UseQueryOptions<GetApiVersionQuery, TError, TData>
    ) =>
    useQuery<GetApiVersionQuery, TError, TData>(
      variables === undefined ? ['GetApiVersion'] : ['GetApiVersion', variables],
      fetchData<GetApiVersionQuery, GetApiVersionQueryVariables>(GetApiVersionDocument, variables),
      options
    );
export const SearchUsersDocument = `
    query SearchUsers($query: UserSearchCriteria!) {
  searchUsers(query: $query) {
    userId
    username
    displayName
    bio
  }
}
    `;
export const useSearchUsersQuery = <
      TData = SearchUsersQuery,
      TError = unknown
    >(
      variables: SearchUsersQueryVariables,
      options?: UseQueryOptions<SearchUsersQuery, TError, TData>
    ) =>
    useQuery<SearchUsersQuery, TError, TData>(
      ['SearchUsers', variables],
      fetchData<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, variables),
      options
    );
export const GetMeDocument = `
    query GetMe {
  getMe {
    userId
    username
    displayName
    bio
    websiteUrl
    avatarUrl
    chirpCount
    followersCount
    followingCount
  }
}
    `;
export const useGetMeQuery = <
      TData = GetMeQuery,
      TError = unknown
    >(
      variables?: GetMeQueryVariables,
      options?: UseQueryOptions<GetMeQuery, TError, TData>
    ) =>
    useQuery<GetMeQuery, TError, TData>(
      variables === undefined ? ['GetMe'] : ['GetMe', variables],
      fetchData<GetMeQuery, GetMeQueryVariables>(GetMeDocument, variables),
      options
    );
export const GetPostDocument = `
    query GetPost($postId: ID!) {
  getPost(postId: $postId) {
    postId
    userId
    content
    likesCount
    isPublished
    annotation
    parentId
  }
}
    `;
export const useGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      variables: GetPostQueryVariables,
      options?: UseQueryOptions<GetPostQuery, TError, TData>
    ) =>
    useQuery<GetPostQuery, TError, TData>(
      ['GetPost', variables],
      fetchData<GetPostQuery, GetPostQueryVariables>(GetPostDocument, variables),
      options
    );
export const GetRecentPostsFromUserDocument = `
    query GetRecentPostsFromUser($userId: ID!, $page: Int!, $pageSize: Int!) {
  getRecentPostsFromUser(userId: $userId, page: $page, pageSize: $pageSize) {
    postId
    userId
    content
    likesCount
    isPublished
    annotation
    parentId
  }
}
    `;
export const useGetRecentPostsFromUserQuery = <
      TData = GetRecentPostsFromUserQuery,
      TError = unknown
    >(
      variables: GetRecentPostsFromUserQueryVariables,
      options?: UseQueryOptions<GetRecentPostsFromUserQuery, TError, TData>
    ) =>
    useQuery<GetRecentPostsFromUserQuery, TError, TData>(
      ['GetRecentPostsFromUser', variables],
      fetchData<GetRecentPostsFromUserQuery, GetRecentPostsFromUserQueryVariables>(GetRecentPostsFromUserDocument, variables),
      options
    );
export const GetTimelineDocument = `
    query GetTimeline($page: Int!, $pageSize: Int!) {
  getTimeline(page: $page, pageSize: $pageSize) {
    postId
    userId
    content
    likesCount
    isPublished
    annotation
    parentId
  }
}
    `;
export const useGetTimelineQuery = <
      TData = GetTimelineQuery,
      TError = unknown
    >(
      variables: GetTimelineQueryVariables,
      options?: UseQueryOptions<GetTimelineQuery, TError, TData>
    ) =>
    useQuery<GetTimelineQuery, TError, TData>(
      ['GetTimeline', variables],
      fetchData<GetTimelineQuery, GetTimelineQueryVariables>(GetTimelineDocument, variables),
      options
    );
export const RefreshDocument = `
    query Refresh {
  refresh
}
    `;
export const useRefreshQuery = <
      TData = RefreshQuery,
      TError = unknown
    >(
      variables?: RefreshQueryVariables,
      options?: UseQueryOptions<RefreshQuery, TError, TData>
    ) =>
    useQuery<RefreshQuery, TError, TData>(
      variables === undefined ? ['Refresh'] : ['Refresh', variables],
      fetchData<RefreshQuery, RefreshQueryVariables>(RefreshDocument, variables),
      options
    );