import { useState } from "react"

import "./signup.css"

import AuthService from "../../services/AuthService"
import type { SignupData } from "../../services/AuthService"

import { filter_input_special } from "../../helpers/text_methods"

function Signup() {
    const [signupData, setSignupData] = useState<SignupData>({
	username: "",
	password: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	AuthService.signup(signupData)
	setSignupData({
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
	setSignupData({
	    ...signupData,
	    username: e.target.value
	});
    }

    async function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
	e.preventDefault();
	if (!filter_input_special(e.target.value)) {
	    // TODO: show user an error maybe?
	    return;
	}
	setSignupData({
	    ...signupData,
	    password: e.target.value
	});
    }

    return (
        <div>
            Signup
	    <form onSubmit={handleSubmit}>
		<input type="text" name="username" value={signupData.username} onChange={handleChangeUsername} />
		<input type="text" name="password" value={signupData.password} onChange={handleChangePassword} />
		<button type="submit">Signup</button>
	    </form>
        </div>
    )
}

export default Signup