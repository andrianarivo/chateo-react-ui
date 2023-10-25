import {Outlet, useNavigate} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {GET_ME} from "../graphql/queries.ts";
import {createContext, useEffect, useState} from "react";
import {User} from "../components/UserList.tsx";

const AuthContext = createContext<User | null>(null);
export {AuthContext};

export default function ProtectedRoutes() {
  const [getMe, {loading, error}] = useLazyQuery(GET_ME);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const _getMe = async () => {
      getMe().then((res) => {
        if (res.data.getMe.entity) {
          setUser(res.data.getMe.entity as User);
          navigate("/");
        }
      }).catch(() => {
        navigate("/login");
      })
    }
    _getMe();

  }, [getMe]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return <AuthContext.Provider value={user}>
    <Outlet/>
  </AuthContext.Provider>
}