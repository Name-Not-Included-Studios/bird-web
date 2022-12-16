import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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

export type Query = {
  __typename?: 'Query';
  apiStatus?: Maybe<ApiStatus>;
  /** @deprecated https://stackoverflow.com/questions/59868942/graphql-a-schema-must-have-a-query-operation-defined */
  ping?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryUsersArgs = {
  userArgs: UserArgs;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  chirpCount?: Maybe<Scalars['Int']>;
  displayName: Scalars['String'];
  followersCount?: Maybe<Scalars['Int']>;
  followingCount?: Maybe<Scalars['Int']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  userId: Scalars['ID'];
  username: Scalars['String'];
  websiteUrl?: Maybe<Scalars['String']>;
};

export type UserArgs = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  chirpCount?: InputMaybe<Scalars['Int']>;
  displayName?: InputMaybe<Scalars['String']>;
  followersCount?: InputMaybe<Scalars['Int']>;
  followingCount?: InputMaybe<Scalars['Int']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

/**
 * input UserInput {
 *     username: String
 *     displayName: String
 * }
 */
export type ApiStatus = {
  __typename?: 'apiStatus';
  version: Scalars['String'];
};

export type GetApiStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApiStatusQuery = { __typename?: 'Query', apiStatus?: { __typename?: 'apiStatus', version: string } | null };


export const GetApiStatusDocument = `
    query GetApiStatus {
  apiStatus {
    version
  }
}
    `;
export const useGetApiStatusQuery = <
      TData = GetApiStatusQuery,
      TError = unknown
    >(
      variables?: GetApiStatusQueryVariables,
      options?: UseQueryOptions<GetApiStatusQuery, TError, TData>
    ) =>
    useQuery<GetApiStatusQuery, TError, TData>(
      variables === undefined ? ['GetApiStatus'] : ['GetApiStatus', variables],
      fetchData<GetApiStatusQuery, GetApiStatusQueryVariables>(GetApiStatusDocument, variables),
      options
    );