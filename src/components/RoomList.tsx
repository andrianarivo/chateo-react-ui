import {useQuery} from "@apollo/client";
import {NavLink, useParams} from "react-router-dom";
import {GET_ALL_ROOMS} from "../graphql/queries.ts";
import {List, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";

export type Room = {
  _id: string;
  name: string;
  isPrivate: boolean;
}

export default function RoomList() {

  const {loading, error, data} = useQuery(GET_ALL_ROOMS);
  const params = useParams();

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div>
        <Typography variant="lead" className="text-center underline underline-offset-2">
          Public rooms
        </Typography>
        <List>
          {data.getAllRooms.entities && data.getAllRooms.entities
              .filter((room: Room) => !room.isPrivate)
              .map((room: Room) => (
                  <div key={room._id}>
                    <NavLink to={`/room/${room._id}`}>
                      <ListItem
                          selected={params.id === room._id}>
                        <ListItemPrefix>
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5"
                          >
                            <path
                                fillRule="evenodd"
                                d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                                clipRule="evenodd"
                            />
                          </svg>
                        </ListItemPrefix>
                        {room.name}
                      </ListItem>
                    </NavLink>
                  </div>
              ))}
        </List>

      </div>
  )
}