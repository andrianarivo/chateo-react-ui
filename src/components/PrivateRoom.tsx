import {useParams} from "react-router-dom";
import usePrivateRoom from "../hooks/usePrivateRoom.ts";
import CreateMessage from "./CreateMessage.tsx";
import {useQuery} from "@apollo/client";
import {GET_MESSAGES_BY_ROOM_ID} from "../graphql/queries.ts";
import {Message} from "./PublicRoom.tsx";
import {AuthContext} from "../pages/ProtectedRoutes.tsx";
import {useContext} from "react";

export default function PrivateRoom() {
  const userData = useContext(AuthContext)
  const params = useParams();
  const roomName = [params.id, userData?._id].sort().join("_");
  const room = usePrivateRoom(roomName);

  const {loading, error, data} = useQuery(GET_MESSAGES_BY_ROOM_ID, {variables: {room: room?._id}});

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div>
        <h1>Private Room: {params.id}</h1>
        {data.getMessagesByRoom.entities && data.getMessagesByRoom.entities.map((message: Message) => (
                <div key={message._id}>
                  <p>{message.content}{" "}<em>by {message.author.firstname}</em></p>
                </div>
            )
        )}

        {room && <CreateMessage room={room._id}/>}
      </div>
  )

}
