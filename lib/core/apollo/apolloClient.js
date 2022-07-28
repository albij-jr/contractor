import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: '', // e.g. https://www.myapi.com/api/v2
      headers: {
        lang: 'en',
      },
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;