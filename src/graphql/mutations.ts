import {gql} from "@apollo/client";

export const CREATE_ROOM = gql`
    mutation CreateRoom($input: RoomCreatedInput!) {
        createRoom(input: $input) {
            ... on RoomCreated {
                entity {
                    _id
                    name
                    isPrivate
                }
            }
        }
    }
`;

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            ... on Login {
                token
                message
            }
        }
    }
`;

export const REGISTER = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            ... on Register {
                message
            }
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation CreateMessage($input: MessageCreatedInput!) {
        createMessage(input: $input) {
            ... on MessageCreated {
                entity {
                    _id
                    author {
                        _id
                        firstname
                    }
                    content
                    room
                }
            }
        }
    }
`;