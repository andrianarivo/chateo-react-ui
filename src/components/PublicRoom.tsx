import {useParams} from "react-router-dom";

export default function PublicRoom() {
  const params = useParams();
  return (
      <div>
        <h1>Public Room: {params.name}</h1>
      </div>
  )
}