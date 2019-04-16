import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';


  
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
         Client:'enterprise.staging.salalem.com',
       
      }
    }
  });
const cache = new InMemoryCache();
const link= authLink.concat(httpLink)
const client =new ApolloClient({cache,link})

export default client