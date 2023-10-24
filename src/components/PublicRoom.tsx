import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_MESSAGES_BY_ROOM_ID} from "../graphql/queries.ts";
import CreateMessage from "./CreateMessage.tsx";

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
  const {loading, error, data} = useQuery(GET_MESSAGES_BY_ROOM_ID, {variables: {room: params.id}});

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div>
        <h1>Public Room: {params.id}</h1>
        {data.getMessagesByRoom.entities && data.getMessagesByRoom.entities.map((message: Message) => (
                <div key={message._id}>
                  <p>{message.content}{" "}<em>by {message.author.firstname}</em></p>
                </div>
            )
        )}

        <CreateMessage room={params.id}/>
      </div>
  )
}