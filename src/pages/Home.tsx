import useSession from "../hooks/useSession.ts";
import CreateRoom from "../components/CreateRoom.tsx";
import RoomList from "../components/RoomList.tsx";
import {Outlet} from "react-router-dom";

export default function Home() {
  useSession();
  return (
      <div className="flex items-center justify-center min-h-screen">
        <aside
            className="flex flex-col items-center justify-between w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
          <div className="flex flex-col items-center justify-center">
            <a href="#"
               className="text-3xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">Brand</a>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 hover:underline">Admin</p>
          </div>

          <CreateRoom/>
          <RoomList/>
        </aside>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-700">
          <Outlet/>
        </main>
      </div>
  );
}