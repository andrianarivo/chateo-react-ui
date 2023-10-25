import {useLazyQuery, useSubscription} from "@apollo/client";
import {GET_MESSAGES_BY_ROOM_ID} from "../graphql/queries.ts";
import {MESSAGE_FEED} from "../graphql/subscriptions.ts";
import {useEffect, useState} from "react";
import MessageItem from "./MessageItem.tsx";

export type Message = {
  _id: string;
  content: string;
  author: {
    email: string;
    firstname: string;
    _id: string;
  };
  room: string;
}

type RoomProps = {
  roomId: string;
}

export default function RoomScreen({roomId}: RoomProps) {

  const [getMessagesByRoomId, {
    loading,
    error,
  }] = useLazyQuery(GET_MESSAGES_BY_ROOM_ID, {fetchPolicy: 'no-cache'});
  const messageFeed = useSubscription(MESSAGE_FEED, {variables: {room: roomId}});
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messageFeed.data) {
      setMessages((messages: Message[]) => [...messages, messageFeed.data.messageCreated.entity]);
    }
  }, [messageFeed.data])

  useEffect(() => {
    getMessagesByRoomId({variables: {room: roomId}}).then((res) => {
      if (res.data.getMessagesByRoom.entities) {
        setMessages(res.data.getMessagesByRoom.entities);
      } else {
        setMessages([]);
      }
    });
  }, [roomId]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (

      <div
          className="p-1 flex-1 overflow-y-auto scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80"
      >
        {messages && messages.map((message: Message) => (
                <MessageItem key={message._id} message={message}/>
            )
        )}
      </div>

  )
}