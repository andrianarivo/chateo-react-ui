import {useQuery} from "@apollo/client";
import {NavLink} from "react-router-dom";
import {GET_ALL_ROOMS} from "../graphql/queries.ts";

export type Room = {
  _id: string;
  name: string;
  isPrivate: boolean;
}

export default function RoomList() {

  const {loading, error, data} = useQuery(GET_ALL_ROOMS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div>
        <h1>RoomList</h1>
        {data.getAllRooms.entities && data.getAllRooms.entities
            .filter((room: Room) => !room.isPrivate)
            .map((room: Room) => (
                <div key={room._id}>
                  <NavLink to={`/room/${room._id}`}>{room.name}</NavLink>
                  <br/>
                </div>
            ))}
      </div>
  )
}