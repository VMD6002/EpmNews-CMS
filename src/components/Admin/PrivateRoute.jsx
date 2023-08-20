import { Navigate } from "react-router-dom"
import { useAuth } from "../Firebase/AuthContext"

export default function PrivateRoute({children}) {
  const { User } = useAuth();
  return User ? children : <Navigate to="/login" />
}
