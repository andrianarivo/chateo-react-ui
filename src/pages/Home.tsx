import CreateRoom from "../components/CreateRoom.tsx";
import RoomList from "../components/RoomList.tsx";
import UserList from "../components/UserList.tsx";
import {Typography} from "@material-tailwind/react";
import {AuthContext} from "./ProtectedRoutes.tsx";
import {Outlet} from "react-router-dom";

export default function Home() {

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
                  {userData && <Typography
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">{userData?.firstname}
                  </Typography>}
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