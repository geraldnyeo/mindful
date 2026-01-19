import { useState } from "react"
import { useNavigate } from "react-router"

import "./signup.css"

import AuthService from "../../services/AuthService"
import type { SignupData } from "../../services/AuthService"
import type { userRole } from "../../services/UserService"

import { filter_input_special, filter_input_email } from "../../helpers/text_methods"

function Signup() {
	const navigate = useNavigate();

    const [signupData, setSignupData] = useState<SignupData>({
		email: "",
		name: "",
		pw: "",
		role: "guest"
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		AuthService.signup(signupData);
		if (!filter_input_email(signupData.email)) {
			// TODO: show user an error maybe?
			return;
		}
		setSignupData({
			email: "",
			name: "",
			pw: "",
			role: "guest"
		});
		navigate("/")
    }

    async function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		// TODO: Email regex to check if it follows the email format
		if (!filter_input_special(e.target.value)) {
			// TODO: show user an error maybe?
			return;
		}
		setSignupData({
			...signupData,
			email: e.target.value
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
			pw: e.target.value
		});
    }

	async function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		if (!filter_input_special(e.target.value)) {
			// TODO: show user an error maybe?
			return;
		}
		setSignupData({
			...signupData,
			name: e.target.value
		});
	}

	async function handleChangeRole(e: React.ChangeEvent<HTMLSelectElement>) {
		e.preventDefault();
		setSignupData({
			...signupData,
			role: e.target.value as userRole
		});
	}

    return (
        <div>
            Signup
	    <form onSubmit={handleSubmit}>
			<input type="text" name="email" value={signupData.email} placeholder="Email" onChange={handleChangeEmail} />
			<input type="text" name="name" value={signupData.name} placeholder="Username" onChange={handleChangeName} />
			<input type="text" name="password" value={signupData.pw} placeholder="Password" onChange={handleChangePassword} />
			<select name="role" value={signupData.role} onChange={handleChangeRole}>
				<option value="guest" disabled>--Role--</option>
				<option value="volunteer">Volunteer</option>
				<option value="participant">Participant</option>
				<option value="admin">Admin</option>
			</select>
			<button type="submit">Signup</button>
	    </form>
        </div>
    )
}

export default Signup