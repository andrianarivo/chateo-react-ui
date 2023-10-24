import {gql} from "@apollo/client";

export const MESSAGE_FEED = gql`
    subscription MessageFeed {
        messageCreated {
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