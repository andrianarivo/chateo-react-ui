import {Button} from "@material-tailwind/react";
import {gql, useMutation} from '@apollo/client';
import {NavLink} from "react-router-dom"
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {toast} from "react-toastify";
import Input from "../components/Input.tsx";

const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            ... on Login {
                token
                message
            }
        }
    }
`;

type LoginInput = {
  email: string;
  password: string;
}

export default function Login() {

  const [login] = useMutation(LOGIN);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const {register, handleSubmit, formState} = useForm(formOptions);

  const {errors} = formState;

  const _login = (data: LoginInput) => {
    toast.promise(
        login({
          variables: {
            input: {
              email: data.email,
              password: data.password
            }
          }
        }).then((res) => {
          if (res.data.login.token) {
            localStorage.setItem("token", res.data.login.token);
          } else {
            throw Error();
          }
        }),
        {
          pending: 'loading...',
          success: 'Login success',
          error: 'Invalid credentials',
        },
    );
  };

  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(_login)}>

          <Input name="email" type="email" register={register} placeholder="Email"/>
          <div className="text-red-500 text-xs">
            {errors.email?.message}
          </div>

          <Input name="password" type="password" register={register} placeholder="Password"/>
          <div className="text-red-500 text-xs">
            {errors.password?.message}
          </div>

          <Button color="blue" type="submit" ripple={true}>Login</Button>
        </form>

        <NavLink to={"/register"}>Register</NavLink>
      </div>
  );
}