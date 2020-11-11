import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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
  magentoUsers: Array<MagentoUser>;
};

export type MagentoUser = {
  __typename?: 'MagentoUser';
  id: Scalars['Float'];
  magentoId: Scalars['Float'];
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  name: Scalars['String'];
  email: Scalars['String'];
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  ) }
);

export type MagentoUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type MagentoUsersQuery = (
  { __typename?: 'Query' }
  & { magentoUsers: Array<(
    { __typename?: 'MagentoUser' }
    & Pick<MagentoUser, 'id' | 'magentoId' | 'email'>
  )> }
);


export const RegisterDocument = gql`
    mutation register($options: RegisterInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MagentoUsersDocument = gql`
    query magentoUsers {
  magentoUsers {
    id
    magentoId
    email
  }
}
    `;

/**
 * __useMagentoUsersQuery__
 *
 * To run a query within a React component, call `useMagentoUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMagentoUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMagentoUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMagentoUsersQuery(baseOptions?: Apollo.QueryHookOptions<MagentoUsersQuery, MagentoUsersQueryVariables>) {
        return Apollo.useQuery<MagentoUsersQuery, MagentoUsersQueryVariables>(MagentoUsersDocument, baseOptions);
      }
export function useMagentoUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MagentoUsersQuery, MagentoUsersQueryVariables>) {
          return Apollo.useLazyQuery<MagentoUsersQuery, MagentoUsersQueryVariables>(MagentoUsersDocument, baseOptions);
        }
export type MagentoUsersQueryHookResult = ReturnType<typeof useMagentoUsersQuery>;
export type MagentoUsersLazyQueryHookResult = ReturnType<typeof useMagentoUsersLazyQuery>;
export type MagentoUsersQueryResult = Apollo.QueryResult<MagentoUsersQuery, MagentoUsersQueryVariables>;