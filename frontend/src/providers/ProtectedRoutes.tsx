import type { ReactElement } from 'react';
import { useAppSelector } from '../redux/hook';
import { Navigate, useLocation } from "react-router-dom"; 

export default function ProtectedRoutes({children}: {children: ReactElement}) {
    const builder = useAppSelector(state => state.builder);
    const hederaApp = useAppSelector(state => state.hederaApp);
    const location = useLocation();

    return (
        <>{(builder.isLogged || hederaApp.isLogged) ? <>{children}</> : <Navigate to="/signin" state={{ from: location }} replace />}</>
    )
}
