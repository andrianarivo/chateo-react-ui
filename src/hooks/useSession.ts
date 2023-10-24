import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ME} from "../graphql/queries.ts";

export default function useSession() {
  const {data, error} = useQuery(GET_ME);

  const [token] = useState(() => {
    // getting stored value
    const initialValue = localStorage.getItem('token');
    return initialValue || null;
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

}