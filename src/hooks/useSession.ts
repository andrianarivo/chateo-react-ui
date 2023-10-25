import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ME} from "../graphql/queries.ts";

type Session = {
  userData: any;
  token: string | null;
}
export default function useSession(): Session {
  const {data, error} = useQuery(GET_ME);

  const [token] = useState(() => {
    // getting stored value
    return localStorage.getItem('token');
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    if (error?.graphQLErrors[0].message.includes("jwt expired")) {
      localStorage.removeItem('token');
      navigate('/login');
    }

  }, [token, error]);

  if (data) {
    return {
      userData: data.getMe.entity,
      token,
    }
  }

  return {
    userData: null,
    token,
  }

}