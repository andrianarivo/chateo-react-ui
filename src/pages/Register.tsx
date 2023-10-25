import {useMutation} from "@apollo/client";
import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import Input from "../components/Input.tsx";
import {toast} from "react-toastify";
import {REGISTER} from "../graphql/mutations.ts";
import ValidationMessage from "../components/ValidationMessage.tsx";

type RegisterInput = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export default function Register() {

  const [_register] = useMutation(REGISTER);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Provide a valid email").required("Provide an email"),
    firstname: Yup.string().required("Provide a firstname"),
    lastname: Yup.string().required("Provide a lastname"),
    password: Yup.string().required("Provide a password"),
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
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
              Register to Chateo!
            </Typography>
            <form onSubmit={handleSubmit(register_)} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1">
                <Input placeholder="Email" type="email" name="email" register={register}/>
                <ValidationMessage message={errors.email?.message}/>
              </div>

              <div className="flex flex-col gap-1">
                <Input placeholder="Firstname" type="name" name="firstname" register={register}/>
                <ValidationMessage message={errors.firstname?.message}/>
              </div>

              <div className="flex flex-col gap-1">
                <Input placeholder="Lastname" type="name" name="lastname" register={register}/>
                <ValidationMessage message={errors.lastname?.message}/>
              </div>

              <div className="flex flex-col gap-1">
                <Input placeholder="Password" type="password" name="password" register={register}/>
                <ValidationMessage message={errors.password?.message}/>
              </div>

              <Button color="blue" size="lg" ripple={true} type="submit">Register</Button>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography className="text-center">
              Already have an account? <NavLink className="underline underline-offset-2"
                                                to={"/login"}>Login</NavLink>
            </Typography>
          </CardFooter>
        </Card>

      </div>
  );
}