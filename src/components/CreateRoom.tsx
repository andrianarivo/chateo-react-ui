import Input from "./Input.tsx";
import {Button} from "@material-tailwind/react";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {CREATE_ROOM} from "../graphql/mutations.ts";

export default function CreateRoom() {

  const [createRoom] = useMutation(CREATE_ROOM);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const {register, handleSubmit, formState} = useForm(formOptions);

  const {errors} = formState;

  const navigate = useNavigate();

  const _createRoom = (data: any) => {
    toast.promise(createRoom({
      variables: {
        input: {
          name: data.name,
          isPrivate: false
        }
      }
    }).then((res) => {
      if (!res.data.createRoom.entity) {
        throw Error();
      }
    }).catch((err) => {
      if (err.message.includes("Not authenticated")) {
        navigate("/login")
      }
      throw err;
    }), {
      pending: 'loading...',
      success: 'PublicRoom created',
      error: 'Error creating room'
    });
  }
  return (
      <form onSubmit={handleSubmit(_createRoom)}>
        <Input register={register} name="name" placeholder="PublicRoom name" type="text"/>
        <div className="text-red-500 text-xs">
          {errors.name?.message}
        </div>

        <Button color="blue" ripple={true} type="submit">Create</Button>
      </form>
  )
}