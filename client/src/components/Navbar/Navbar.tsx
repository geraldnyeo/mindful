import { Link } from "react-router"

import "./navbar.css"

type NavbarProps = {
    userType: "admin" | "participant" | "volunteer" | null
}

function Navbar({ userType }: NavbarProps) {
    const today = new Date();
    const monthyear = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear().toString()}`;

    return (
        <nav>
            <Link to="/dashboard">Home</Link>
            <Link to={`/calendar/${monthyear}`}>Events</Link>
                { userType === "admin" && 
                    <Link to="/analytics">Analytics</Link>
                }
        </nav>
    )
}

export default Navbar