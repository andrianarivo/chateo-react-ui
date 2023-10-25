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
import {ThemeProvider} from "@material-tailwind/react";

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  const theme = {
    list: {
      defaultProps: {
        ripple: true,
        className: "",
      },
      styles: {
        base: {
          list: {
            display: "flex",
            flexDirection: "flex-col",
            gap: "gap-1",
            minWidth: "min-w-[240px]",
            p: "p-2",
            fontFamily: "font-sans",
            fontSize: "text-base",
            fontWeight: "font-normal",
            color: "text-blue-gray-700",
          },
          item: {
            initial: {
              display: "flex",
              alignItems: "items-center",
              width: "w-full",
              padding: "p-3",
              borderRadius: "rounded-lg",
              textAlign: "text-start",
              lightHeight: "leading-tight",
              transition: "transition-all",
              bg: "hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-slate-700 focus:bg-opacity-80 active:bg-slate-700 active:bg-opacity-80",
              color: "hover:text-blue-gray-900 focus:text-white active:text-white",
              outline: "outline-none",
            },
            selected: {
              bg: "bg-slate-700",
              color: "text-white",
            },
            disabled: {
              opacity: "opacity-50",
              cursor: "cursor-not-allowed",
              pointerEvents: "pointer-events-none",
              userSelect: "select-none",
              bg: "hover:bg-transparent focus:bg-transparent active:bg-transparent",
              color: "hover:text-blue-gray-500 focus:text-blue-gray-500 active:text-blue-gray-500",
            },
          },
          itemPrefix: {
            display: "grid",
            placeItems: "place-items-center",
            marginRight: "mr-4",
          },
          itemSuffix: {
            display: "grid",
            placeItems: "place-items-center",
            marginRight: "ml-auto justify-self-end",
          },
        },
      },
    },
  }

  return (
      <ThemeProvider value={theme}>
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
      </ThemeProvider>
  )
}

export default App
