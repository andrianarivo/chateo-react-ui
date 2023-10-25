import {useParams} from "react-router-dom";
import usePrivateRoom from "../hooks/usePrivateRoom.ts";
import {AuthContext} from "../pages/ProtectedRoutes.tsx";
import {useContext} from "react";
import RoomScreen from "./RoomScreen.tsx";
import CreateMessage from "./CreateMessage.tsx";

export default function PrivateRoom() {
  const userData = useContext(AuthContext)
  const params = useParams();
  const roomName = [params.id, userData?._id].sort().join("_");
  const room = usePrivateRoom(roomName);

  return (
      <div className={"flex flex-col h-screen justify-between"}>
        <RoomScreen roomId={room._id}/>
        <CreateMessage room={room._id}/>
      </div>
  )
}
