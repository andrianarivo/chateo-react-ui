import './App.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import Login from "./pages/Login.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

function App() {

  return (
      <>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Routes>
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
