import { Navigate } from "react-router";

export const PublicRoute = ({ isAuth, children }) => {
    return !isAuth ? children : <Navigate to="/" />;


}