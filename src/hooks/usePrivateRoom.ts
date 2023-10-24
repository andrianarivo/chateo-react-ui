import {CREATE_ROOM} from "../graphql/mutations.ts";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_ROOM_BY_NAME} from "../graphql/queries.ts";
import {toast} from "react-toastify";
import {useEffect} from "react";

export default function usePrivateRoom(roomName: string) {
  const [createRoom] = useMutation(CREATE_ROOM);
  const [getRoomByName] = useLazyQuery(GET_ROOM_BY_NAME);

  useEffect(() => {
    getRoomByName({
      variables: {
        field: "name",
        value: roomName
      },
      fetchPolicy: 'no-cache',
    }).then((res) => {
      if (res.data && !res.data.getRoomByField.entity) {
        toast.promise(createRoom({
          variables: {
            input: {
              name: roomName,
              isPrivate: true
            }
          }
        }), {
          pending: "Creating private room...",
          success: "Room created!",
          error: "Error creating room"
        });
      }
    })
  }, [roomName]);

}