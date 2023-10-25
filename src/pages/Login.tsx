import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {useMutation} from '@apollo/client';
import {NavLink, useNavigate} from "react-router-dom"
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {toast} from "react-toastify";
import Input from "../components/Input.tsx";
import {LOGIN} from "../graphql/mutations.ts";
import ValidationMessage from "../components/ValidationMessage.tsx";

type LoginInput = {
  email: string;
  password: string;
}

export default function Login() {

  const [login] = useMutation(LOGIN);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Provide a valid email').required("Provide an email"),
    password: Yup.string().required('Password is required'),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const {register, handleSubmit, formState} = useForm(formOptions);

  const {errors} = formState;

  const navigate = useNavigate();

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
            navigate("/")
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
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
              Welcome to Chateo!
            </Typography>
            <form onSubmit={handleSubmit(_login)} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1">
                <Input name="email" type="email" register={register} placeholder="Email"/>
                <ValidationMessage message={errors.email?.message}/>
              </div>

              <div className="flex flex-col gap-1">
                <Input name="password" type="password" register={register} placeholder="Password"/>
                <ValidationMessage message={errors.password?.message}/>
              </div>

              <Button color="blue" size="lg" type="submit" ripple={true}>Login</Button>
            </form>

          </CardBody>
          <CardFooter className="pt-0">
            <Typography className="text-center">
              Already have an account?{' '}
              <NavLink className="underline underline-offset-2" to={"/register"}>Register</NavLink>
            </Typography>
          </CardFooter>
        </Card>
      </div>
  );
}