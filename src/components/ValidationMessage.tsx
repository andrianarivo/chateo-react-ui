import {Typography} from "@material-tailwind/react";

type ValidationMessageProps = {
  message: string | undefined;
}

export default function ValidationMessage({message}: ValidationMessageProps) {
  if (message) {
    return (
        <Typography className="text-red-500 text-xs ml-2">
          {message}
        </Typography>
    )
  }
  return (
      <></>
  )
}