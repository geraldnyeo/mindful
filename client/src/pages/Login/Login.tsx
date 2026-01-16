import { useState } from "react"

import "./login.css"

import AuthService from "../../services/AuthService"
import type { LoginData } from "../../services/AuthService"

import { filter_input_special } from "../../helpers/text_methods"

function Login() {
    const [loginData, setLoginData] = useState<LoginData>({
	username: "",
	password: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	AuthService.login(loginData)
	setLoginData({
	    username: "",
	    password: "",
	});
    }

    async function handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
	e.preventDefault();
	if (!filter_input_special(e.target.value)) {
	    // TODO: show user an error maybe?
	    return;
	}
	setLoginData({
	    ...loginData,
	    username: e.target.value
	});
    }

    async function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
	e.preventDefault();
	if (!filter_input_special(e.target.value)) {
	    // TODO: show user an error maybe?
	    return;
	}
	setLoginData({
	    ...loginData,
	    password: e.target.value
	});
    }

    return (
        <div>
            Login
	    <form onSubmit={handleSubmit}>
		<input type="text" name="username" value={loginData.username} onChange={handleChangeUsername} />
		<input type="text" name="password" value={loginData.password} onChange={handleChangePassword} />
		<button type="submit">Login</button>
	    </form>
        </div>
    )
}

export default Login