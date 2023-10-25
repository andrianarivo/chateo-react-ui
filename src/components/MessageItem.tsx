import {Message} from "./PublicRoom.tsx";
import {Typography} from "@material-tailwind/react";
import {AuthContext} from "../pages/ProtectedRoutes.tsx";
import {useContext} from "react";

type MessageProps = {
  message: Message;
}

export default function MessageItem({message}: MessageProps) {
  const userData = useContext(AuthContext);
  return (
      <div
          className={`flex ${userData?._id === message.author._id ? 'justify-end' : 'justify-start'}`}>
        <div
            className={`w-fit ${userData?._id === message.author._id ? 'bg-blue-400' +
                ' rounded-se-xl' +
                ' rounded-s-xl' : 'bg-gray-400 rounded-ss-xl rounded-e-xl'}  px-3 py-1 my-1 text-white shadow-md`}>
          <Typography>
            {message.content}{" "}
          </Typography>
          <Typography variant="small">
            <em>by {message.author.firstname}</em>
          </Typography>
        </div>
      </div>
  )
}