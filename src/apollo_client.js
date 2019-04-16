import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache  } from 'apollo-cache-inmemory';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';




const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'Document',
          possibleTypes: [
            {name: 'MyInterface1'},
            {name: 'SomeInterface2'},
          ],
        },
      ],
    },
  },
});
const cache = new InMemoryCache({ fragmentMatcher });
const httpLink = createHttpLink({
  uri: 'https://lms.api.staging.salalem.com/graphql',
  fetchOptions: {
    	method: 'POST',
  		}	,
});

const authLink = setContext((_, { headers }) => {
  
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
       Client:'enterprise.staging.salalem.com'
     
    }
  }
});
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
}
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  defaultOptions:defaultOptions
});



export default client
