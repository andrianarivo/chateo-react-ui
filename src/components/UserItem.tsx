import {User} from "./UserList.tsx";

type UserItemProps = {
  user: User
}

export default function UserItem({user}: UserItemProps) {
  return (
      <>
        <h1>{user.firstname}</h1>
      </>
  )
}