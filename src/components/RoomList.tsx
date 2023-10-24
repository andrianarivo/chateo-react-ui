import {gql, useQuery} from "@apollo/client";
import {NavLink} from "react-router-dom";

type Room = {
  _id: string;
  name: string;
}

const GET_ALL_ROOMS = gql`
    query GetAllRooms($sort: SortInput) {
        getAllRooms(sort: $sort) {
            ... on Rooms {
                entities {
                    _id
                    name
                }
            }
        }
    }
`;

export default function RoomList() {

  const {loading, error, data} = useQuery(GET_ALL_ROOMS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div>
        <h1>RoomList</h1>
        {data.getAllRooms.entities.map((room: Room) => (
            <>
              <NavLink key={room._id} to={`/room/${room.name}`}>{room.name}</NavLink>
              <br/>
            </>
        ))}
      </div>
  )
}