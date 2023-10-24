import {gql, useMutation} from "@apollo/client";
import {Button} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import Input from "../components/Input.tsx";
import {toast} from "react-toastify";

const REGISTER = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            ... on Register {
                message
            }
        }
    }
`;

type RegisterInput = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export default function Register() {

  const [_register] = useMutation(REGISTER);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    password: Yup.string().required(),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const {register, handleSubmit, formState} = useForm(formOptions);

  const {errors} = formState;

  const register_ = (data: RegisterInput) => {
    toast.promise(
        _register({
          variables: {
            input: {
              email: data.email,
              firstname: data.firstname,
              lastname: data.lastname,
              password: data.password
            }
          }
        }).then((res) => {
          if (!res.data.register.message.includes("Account created successfully.")) {
            throw Error();
          }
        }),
        {
          pending: 'loading...',
          success: 'Register success',
          error: 'Some errors happened',
        }
    );
  }

  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(register_)}>
          <Input placeholder="Email" type="email" name="email" register={register}/>
          <div className="text-red-500 text-xs">
            {errors.email?.message}
          </div>

          <Input placeholder="Firstname" type="name" name="firstname" register={register}/>
          <div className="text-red-500 text-xs">
            {errors.firstname?.message}
          </div>

          <Input placeholder="Lastname" type="name" name="lastname" register={register}/>
          <div className="text-red-500 text-xs">
            {errors.lastname?.message}
          </div>

          <Input placeholder="Password" type="password" name="password" register={register}/>
          <div className="text-red-500 text-xs">
            {errors.password?.message}
          </div>

          <Button color="blue" ripple={true} type="submit">Register</Button>
        </form>
        <NavLink to={"/login"}>Login</NavLink>
      </div>
  );
}