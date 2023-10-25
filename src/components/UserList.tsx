import {NavLink} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "../graphql/queries.ts";

export type User = {
  _id: string;
  firstname: string;
}

type UserListProps = {
  userData: User | null;
}

export default function UserList({userData}: UserListProps) {

  const {loading, error, data} = useQuery(GET_ALL_USERS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div>
        <h1>UserList</h1>
        {data.getAllUsers.entities && data.getAllUsers.entities
            .filter((user: User) => user._id !== userData?._id)
            .map((user: User) => (
                <div key={user._id}>
                  <NavLink to={`/user/${user._id}`}>{user.firstname}</NavLink>
                  <br/>
                </div>
            ))}
      </div>
  )
}