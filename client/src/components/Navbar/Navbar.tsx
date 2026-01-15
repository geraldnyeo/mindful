import { Link } from "react-router"

import "./navbar.css"

type NavbarProps = {
    userType: "admin" | "participant" | "volunteer" | null
}

function Navbar({ userType }: NavbarProps) {
    return (
        <nav>
	    <Link to="/dashboard">Home</Link>
	    <Link to="/calendar">Events</Link>
            { userType === "admin" && 
                <Link to="/analytics">Analytics</Link>
            }
        </nav>
    )
}

export default Navbar