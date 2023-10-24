import {NavLink} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "../graphql/queries.ts";
import useSession from "../hooks/useSession.ts";

type User = {
  _id: string;
  firstname: string;
}

export default function UserList() {

  const {loading, error, data} = useQuery(GET_ALL_USERS);

  const {userData} = useSession() || {userData: {_id: ""}}

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <div>
        <h1>UserList</h1>
        {data.getAllUsers.entities && data.getAllUsers.entities
            .filter((user: User) => user._id !== userData._id)
            .map((user: User) => (
                <div key={user._id}>
                  <NavLink to={`/user/${user._id}`}>{user.firstname}</NavLink>
                  <br/>
                </div>
            ))}
      </div>
  )
}