import { useState } from "react"

import "./login.css"

import AuthService from "../../services/AuthService"

function Login() {
    const [loginData, setLoginData] = useState({
	username: "",
	password: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	// AuthService.login(loginData)
    }

    return (
        <div>
            Login
	    <form onSubmit={handleSubmit}>
		<button type="submit">Login</button>
	    </form>
        </div>
    )
}

export default Login