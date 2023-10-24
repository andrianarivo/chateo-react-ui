import './App.css'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import Login from "./pages/Login.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home.tsx";
import {setContext} from "@apollo/client/link/context";
import PublicRoom from "./components/PublicRoom.tsx";
import PrivateRoom from "./components/PrivateRoom.tsx";

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
      <>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Routes>
              <Route path="/" element={<Home/>}>
                <Route path="/room/:id" element={<PublicRoom/>}/>
                <Route path="/user/:id" element={<PrivateRoom/>}/>
              </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
          </ApolloProvider>
        </BrowserRouter>
        <ToastContainer/>
      </>

  )
}

export default App
