import './App.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import Login from "./pages/Login.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home.tsx";
import PublicRoom from "./components/PublicRoom.tsx";
import PrivateRoom from "./components/PrivateRoom.tsx";
import {splitLink} from "./graphql/link.ts";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {

  return (
      <>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Routes>
              <Route path="/" element={<ProtectedRoutes/>}>
                <Route path="/" element={<Home/>}>
                  <Route path="/room/:id" element={<PublicRoom/>}/>
                  <Route path="/user/:id" element={<PrivateRoom/>}/>
                </Route>
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
