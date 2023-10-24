import {CREATE_ROOM} from "../graphql/mutations.ts";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_ROOM_BY_NAME} from "../graphql/queries.ts";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

export default function usePrivateRoom(roomName: string) {
  const [createRoom] = useMutation(CREATE_ROOM);
  const [getRoomByName] = useLazyQuery(GET_ROOM_BY_NAME);
  const [room, setRoom] = useState();

  useEffect(() => {
    getRoomByName({
      variables: {
        field: "name",
        value: roomName
      },
      fetchPolicy: 'no-cache',
    }).then((res) => {
      if (res.data && res.data.getRoomByField.entity) {
        setRoom(res.data.getRoomByField.entity);
      } else {
        toast.promise(createRoom({
          variables: {
            input: {
              name: roomName,
              isPrivate: true
            }
          }
        }).then((res) => {
          if (res.data && res.data.createRoom.entity) {
            setRoom(res.data.createRoom.entity);
          }
        }), {
          pending: "Creating private room...",
          success: "Room created!",
          error: "Error creating room"
        });
      }
    })
  }, [roomName]);

  return room;
}