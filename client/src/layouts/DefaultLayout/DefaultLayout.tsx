import { useLoaderData, Outlet } from "react-router";

import "./defaultLayout.css"

import Navbar from "../../components/Navbar/Navbar";

function DefaultLayout() {
    const { userType } = useLoaderData();

    return (
        <div className="default-layout-root">
            <div className="nav-wrapper">
                <Navbar userType={userType}/>
            </div>
            <div className="content-wrapper">
                <Outlet />
            </div>
        </div>
    )
}

export default DefaultLayout