import {Button} from "@material-tailwind/react";
import Textarea from "./Textarea.tsx";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {CREATE_MESSAGE} from "../graphql/mutations.ts";
import useSession from "../hooks/useSession.ts";
import {toast} from "react-toastify";

type CreateMessageProps = {
  room: string | undefined;
};

export default function CreateMessage({room}: CreateMessageProps) {

  const [createMessage] = useMutation(CREATE_MESSAGE);
  const {userData} = useSession() || {userData: {_id: ""}};

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const {register, handleSubmit, formState} = useForm(formOptions);

  const {errors} = formState;

  const _createMessage = (data: any) => {
    toast.promise(createMessage({
          variables: {
            input: {
              content: data.content,
              room: room,
              author: userData._id
            }
          }
        }),
        {
          pending: 'loading...',
          success: 'Message created',
          error: 'Error creating message'
        }
    )
  }

  return (
      <form onSubmit={handleSubmit(_createMessage)}>

        <Textarea placeholder="Message" name="content" register={register}/>
        <div className="text-red-500 text-xs">
          {errors.content?.message}
        </div>

        <Button color="blue" ripple={true} type="submit">Send</Button>
      </form>
  )
}