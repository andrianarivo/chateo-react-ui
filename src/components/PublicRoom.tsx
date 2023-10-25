import {useParams} from "react-router-dom";
import {useLazyQuery, useSubscription} from "@apollo/client";
import {GET_MESSAGES_BY_ROOM_ID} from "../graphql/queries.ts";
import CreateMessage from "./CreateMessage.tsx";
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

export default function PublicRoom() {

  const params = useParams();
  const [getMessagesByRoomId, {
    loading,
    error,
  }] = useLazyQuery(GET_MESSAGES_BY_ROOM_ID, {variables: {room: params.id}});
  const messageFeed = useSubscription(MESSAGE_FEED);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messageFeed.data) {
      setMessages((messages: Message[]) => [...messages, messageFeed.data.messageCreated.entity]);
    }
  }, [messageFeed.data])

  useEffect(() => {
    getMessagesByRoomId().then((res) => {
      setMessages(res.data.getMessagesByRoom.entities);
    });
  }, []);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div className={"flex flex-col h-screen justify-between"}>

        <div>
          {messages.map((message: Message) => (
                  <MessageItem key={message._id} message={message}/>
              )
          )}
        </div>

        <CreateMessage room={params.id}/>
      </div>
  )
}