import {useParams} from "react-router-dom";

export default function Room() {
  const params = useParams();
  return (
      <div>
        <h1>Room: {params.name}</h1>
      </div>
  )
}