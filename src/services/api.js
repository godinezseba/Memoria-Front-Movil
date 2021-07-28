import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

/**
 * Instance of GraphQL client.
 * ref: https://www.apollographql.com/docs/react/networking/authentication/#header
 */
const httpLink = createHttpLink({
  uri: Constants.manifest.extra.API_URL,
});

/**
 * Function to add token in every call
 */
const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
    }
  }
});

export const apiGraph = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
