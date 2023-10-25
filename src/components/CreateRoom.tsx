import Input from "./Input.tsx";
import {Button} from "@material-tailwind/react";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {CREATE_ROOM} from "../graphql/mutations.ts";
import ValidationMessage from "./ValidationMessage.tsx";

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
      <form onSubmit={handleSubmit(_createRoom)} className="flex gap-2">
        <div className="flex flex-col gap-1">
          <Input register={register} name="name" placeholder="New public room" type="text"
                 width="50" minWidth="50"/>
          <ValidationMessage message={errors.name?.message}/>
        </div>

        <Button color="blue" size="sm" ripple={true} type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-house-add" viewBox="0 0 16 16">
            <path
                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h4a.5.5 0 1 0 0-1h-4a.5.5 0 0 1-.5-.5V7.207l5-5 6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path
                d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 1 0 1 0v-1h1a.5.5 0 1 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
          </svg>
        </Button>
      </form>
  )
}