import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "../features/auth/authApi";
import Loader from "@/components/Loader";
import EmployeeLogin from "./EmployeeLogin";

const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => !!state.auth.token);
    const [refresh, { isLoading, isError }] = useRefreshMutation();
    const location = useLocation();
    const isMounted = useRef(false);

    useEffect(() => {
        if(!isMounted.current && (process.env.NODE_ENV === "development")) {
            return () => isMounted.current = true;
        }

        async function verifyRefreshToken() {
            try {
                await refresh();
            }
            catch(err) {
                console.error(err);
            }
        }

        if(!isAuthenticated) {
            verifyRefreshToken();
        }
    }, []);

    if(isLoading) {
        return <Loader/>;
    }
    else if(isError) {
        return <Navigate to="/auth/employee/login" state={{ from: location }} replace/>;
    }

    return isAuthenticated ? <Outlet/> : <EmployeeLogin/>;
};

export default ProtectedRoute;