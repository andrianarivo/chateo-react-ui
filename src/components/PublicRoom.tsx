import {useParams} from "react-router-dom";
import RoomScreen from "./RoomScreen.tsx";
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

  if (params.id) {
    return (
        <div className={"flex flex-col h-screen justify-between"}>
          <RoomScreen roomId={params.id}/>
          <CreateMessage room={params.id}/>
        </div>
    )
  }

  return <div>Couldn't find room</div>
}