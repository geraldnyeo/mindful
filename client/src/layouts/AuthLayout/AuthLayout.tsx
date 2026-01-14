import { Outlet } from "react-router"

import "./authLayout.css"

function AuthLayout() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default AuthLayout