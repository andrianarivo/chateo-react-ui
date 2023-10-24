import {useParams} from "react-router-dom";
import usePrivateRoom from "../hooks/usePrivateRoom.ts";
import useSession from "../hooks/useSession.ts";

export default function PrivateRoom() {
  const params = useParams();
  const {userData} = useSession() || {userData: {_id: ""}};
  const roomName = [params.id, userData._id].sort().join("_");
  usePrivateRoom(roomName);
  return (
      <div>
        <h1>Private Room: {params.id}</h1>
      </div>
  )

}
