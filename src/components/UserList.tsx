import {NavLink} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";

type User = {
  _id: string;
  firstname: string;
}

const GET_ALL_USERS = gql`
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

export default function UserList() {

  const {loading, error, data} = useQuery(GET_ALL_USERS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div>
        <h1>UserList</h1>
        {data.getAllUsers.entities.map((user: User) => (
            <>
              <NavLink key={user._id} to={`/user/${user._id}`}>{user.firstname}</NavLink>
              <br/>
            </>
        ))}
      </div>
  )
}