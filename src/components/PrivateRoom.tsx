import {useParams} from "react-router-dom";
import usePrivateRoom from "../hooks/usePrivateRoom.ts";
import CreateMessage from "./CreateMessage.tsx";
import {useLazyQuery} from "@apollo/client";
import {GET_MESSAGES_BY_ROOM_ID} from "../graphql/queries.ts";
import {Message} from "./PublicRoom.tsx";
import {AuthContext} from "../pages/ProtectedRoutes.tsx";
import {useContext, useEffect, useState} from "react";
import MessageItem from "./MessageItem.tsx";

export default function PrivateRoom() {
  const userData = useContext(AuthContext)
  const params = useParams();
  const roomName = [params.id, userData?._id].sort().join("_");
  const room = usePrivateRoom(roomName);
  const [messages, setMessages] = useState<Message[]>([]);

  const [getMessagesByRoomId, {
    loading,
    error
  }] = useLazyQuery(GET_MESSAGES_BY_ROOM_ID);

  useEffect(() => {
    getMessagesByRoomId({variables: {room: room._id}}).then((res) => {
      setMessages(res.data.getMessagesByRoom.entities);
    });
  }, [room._id]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div className={"flex flex-col h-screen justify-between"}>

        <div>
          {messages && messages.map((message: Message) => (
                  <MessageItem key={message._id} message={message}/>
              )
          )}
        </div>

        <CreateMessage room={room._id}/>
      </div>
  )

}
