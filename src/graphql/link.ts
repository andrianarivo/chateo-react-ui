import {createHttpLink, split} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {getMainDefinition} from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.VITE_GRAPHQL_WS_URI,
}));

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) => {
          console.log(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
          );
          if (message.includes('Not authenticated.') || message.includes('jwt expired') || message.includes('invalid token')) {
            localStorage.removeItem('token');
            history.push('/login');
            window.location.reload();
          }
        }
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const mainLink = errorLink.concat(authLink).concat(httpLink);

const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
      );
    },
    wsLink,
    mainLink
);

export {
  mainLink,
  splitLink,
}