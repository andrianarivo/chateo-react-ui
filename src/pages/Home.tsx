import CreateRoom from "../components/CreateRoom.tsx";
import RoomList from "../components/RoomList.tsx";
import UserList from "../components/UserList.tsx";
import {Button, Typography} from "@material-tailwind/react";
import {AuthContext} from "./ProtectedRoutes.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {LOGOUT} from "../graphql/mutations.ts";

export default function Home() {
  const [logout] = useMutation(LOGOUT);
  const navigate = useNavigate();
  return (
      <AuthContext.Consumer>
        {userData => (
            <div className="flex items-center justify-center min-h-screen">
              <aside
                  className="flex flex-col items-center gap-4 overflow-y-auto overflow-x-hidden w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600 shadow-lg scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80">
                <div className="flex flex-col items-center justify-center">
                  <Typography
                      className="text-3xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                    Chateo!
                  </Typography>
                  <div className="flex gap-1">
                    {userData && <Typography
                        className="mt-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">{userData?.firstname}
                    </Typography>}
                    <Button size="sm" onClick={() => {
                      logout().then(() => {
                        navigate("/login");
                      }).finally(() => {
                        localStorage.removeItem("token");
                      });
                    }}>
                      <div className="flex gap-1">
                        Logout
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                          <path
                              d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"/>
                          <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
                        </svg>
                      </div>
                    </Button>
                  </div>
                </div>
                <UserList userData={userData}/>
                <CreateRoom/>
                <RoomList/>
              </aside>
              <main
                  className="flex-1 h-screen overflow-hidden">
                <Outlet/>
              </main>
            </div>
        )}
      </AuthContext.Consumer>

  );
}