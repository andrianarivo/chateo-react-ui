import Textarea from "./Textarea.tsx";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {CREATE_MESSAGE} from "../graphql/mutations.ts";
import {AuthContext} from "../pages/ProtectedRoutes.tsx";
import {useContext} from "react";
import ValidationMessage from "./ValidationMessage.tsx";
import {IconButton} from "@material-tailwind/react";

type CreateMessageProps = {
  room: string | undefined;
};

export default function CreateMessage({room}: CreateMessageProps) {

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const userData = useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Message is empty!'),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const {register, handleSubmit, formState, reset} = useForm(formOptions);

  const {errors} = formState;

  const _createMessage = (data: any) => {
    createMessage({
      variables: {
        input: {
          content: data.content,
          room: room,
          author: userData?._id
        }
      }
    }).then(() => {
      reset();
    })
  }

  return (
      <form onSubmit={handleSubmit(_createMessage)}
            className="flex gap-2 p-2 w-full bg-white shadow-md">

        <div className="flex-1">
          <Textarea placeholder="Message" name="content" register={register}/>
          <ValidationMessage message={errors.content?.message}/>
        </div>

        <IconButton color="blue" className="self-start" ripple={true} type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-send-check-fill" viewBox="0 0 16 16">
            <path
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
            <path
                d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
          </svg>
        </IconButton>
      </form>
  )
}