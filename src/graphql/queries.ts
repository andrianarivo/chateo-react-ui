import {gql} from "@apollo/client";

export const GET_MESSAGES_BY_ROOM_ID = gql`
    query GetMessagesByRoom($room: ObjectId!) {
        getMessagesByRoom(room: $room) {
            ... on Messages {
                entities {
                    _id
                    content
                    author {
                        email
                        firstname
                        _id
                    }
                    room
                }
            }
        }
    }
`;

export const GET_ALL_ROOMS = gql`
    query GetAllRooms($sort: SortInput) {
        getAllRooms(sort: $sort) {
            ... on Rooms {
                entities {
                    _id
                    name
                    isPrivate
                }
            }
        }
    }
`;

export const GET_ALL_USERS = gql`
    query GetAllUsers($sort: SortInput) {
        getAllUsers(sort: $sort) {
            ... on Users {
                entities {
                    _id
                    firstname
                }
            }
        }
    }
`;

export const GET_ME = gql`
    query GetMe {
        getMe {
            ... on UserBy {
                entity {
                    _id
                    email
                    firstname
                    lastname
                }
            }
        }
    }
`;

export const GET_ROOM_BY_NAME = gql`
    query GetRoomByField($field: String!, $value: String!) {
        getRoomByField(field: $field, value: $value) {
            ... on RoomBy {
                entity {
                    _id
                    name
                    isPrivate
                }
            }
        }
    }
`
