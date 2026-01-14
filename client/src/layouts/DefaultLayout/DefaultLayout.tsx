import { useLoaderData, Outlet } from "react-router";

import Navbar from "../../components/Navbar/Navbar";

function DefaultLayout() {
    const { userType } = useLoaderData();

    return (
        <div>
            <Navbar userType={userType}/>
            <Outlet />
        </div>
    )
}

export default DefaultLayout