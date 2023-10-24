import {useParams} from "react-router-dom";

export default function PrivateRoom() {
  const params = useParams();
  return (
      <div>
        <h1>Private Room: {params.id}</h1>
      </div>
  )

}
