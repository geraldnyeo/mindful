import "./navbar.css"

type NavbarProps = {
    userType: "admin" | "participant" | "volunteer" | null
}

function Navbar({ userType }: NavbarProps) {
    return (
        <nav>
            { userType === "admin" && 
                <p>Admin-only Link here</p>
            }
        </nav>
    )
}

export default Navbar