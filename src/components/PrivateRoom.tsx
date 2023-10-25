import {useParams} from "react-router-dom";
import usePrivateRoom from "../hooks/usePrivateRoom.ts";
import CreateMessage from "./CreateMessage.tsx";
import {useLazyQuery, useSubscription} from "@apollo/client";
import {GET_MESSAGES_BY_ROOM_ID} from "../graphql/queries.ts";
import {Message} from "./PublicRoom.tsx";
import {AuthContext} from "../pages/ProtectedRoutes.tsx";
import {useContext, useEffect, useState} from "react";
import MessageItem from "./MessageItem.tsx";
import {MESSAGE_FEED} from "../graphql/subscriptions.ts";

export default function PrivateRoom() {
  const userData = useContext(AuthContext)
  const params = useParams();
  const roomName = [params.id, userData?._id].sort().join("_");
  const room = usePrivateRoom(roomName);
  const messageFeed = useSubscription(MESSAGE_FEED, {variables: {room: room._id}});
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messageFeed.data) {
      setMessages((messages: Message[]) => [...messages, messageFeed.data.messageCreated.entity]);
    }
  }, [messageFeed.data])

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
      <div className="flex flex-col h-screen justify-between">

        <div
            className="p-1 h-3/4 overflow-y-auto scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80">
          {messages && messages.map((message: Message) => (
                  <MessageItem key={message._id} message={message}/>
              )
          )}
        </div>

        <CreateMessage room={room._id}/>
      </div>
  )

}
