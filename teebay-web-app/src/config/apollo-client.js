import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_URI = 'http://localhost:3030/graphql';

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URI,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

export default client;