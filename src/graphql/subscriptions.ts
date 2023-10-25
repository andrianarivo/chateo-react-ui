import {gql} from "@apollo/client";

export const MESSAGE_FEED = gql`
    subscription MessageFeed($room: ObjectId!) {
        messageCreated(room: $room) {
            ... on MessageCreated {
                entity {
                    _id
                    author {
                        _id
                        email
                        firstname
                    }
                    content
                    room
                }
            }
        }
    }
`;