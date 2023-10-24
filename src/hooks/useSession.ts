import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function useSession() {
  const [token, setToken] = useState(() => {
    // getting stored value
    const initialValue = localStorage.getItem('token');
    return initialValue || null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (!token) {
      navigate('/login')
    }
  }, [token]);

  return token;
}