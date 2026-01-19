import { useState } from "react"
import { useNavigate } from "react-router"

import "./login.css"

import AuthService from "../../services/AuthService"
import type { LoginData } from "../../services/AuthService"

import { filter_input_special, filter_input_email } from "../../helpers/text_methods"

function Login() {
	const navigate = useNavigate();

    const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		pw: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!filter_input_email(loginData.email)) {
			// TODO: show user an error maybe?
			return;
		}
		AuthService.login(loginData);
		setLoginData({
			email: "",
			pw: "",
		});
		navigate("/")
    }

    async function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		if (!filter_input_special(e.target.value)) {
			// TODO: show user an error maybe?
			return;
		}
		setLoginData({
			...loginData,
			email: e.target.value
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
			pw: e.target.value
		});
    }

    return (
        <div>
            Login
	    <form onSubmit={handleSubmit}>
			<input type="text" name="email" value={loginData.email} placeholder="Email" onChange={handleChangeEmail} />
			<input type="text" name="password" value={loginData.pw} placeholder="Password" onChange={handleChangePassword} />
			<button type="submit">Login</button>
			</form>
        </div>
    )
}

export default Login