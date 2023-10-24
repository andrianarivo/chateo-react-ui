import {gql} from "@apollo/client";

export const CREATE_ROOM = gql`
    mutation CreateRoom($input: RoomCreatedInput!) {
        createRoom(input: $input) {
            ... on RoomCreated {
                entity {
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
