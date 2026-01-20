import { useState } from "react"
import { useNavigate } from "react-router"
import { Eye, EyeOff, Heart, AlertCircle } from "lucide-react"

import "./login.css"

import AuthService from "../../services/AuthService"
import type { LoginData } from "../../services/AuthService"

import { filter_input_special, filter_input_email } from "../../helpers/text_methods"

function Login() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false)
	const [errors, setErrors] = useState<{email?: string; pw?: string; general?: string}>({})

    const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		pw: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const newErrors: {email?: string; pw?: string; general?: string} = {};

		// Validate email
		if (!loginData.email) {
			newErrors.email = "Email is required";
		} else if (!filter_input_email(loginData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Validate password
		if (!loginData.pw) {
			newErrors.pw = "Password is required";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			await AuthService.login(loginData);
			setLoginData({
				email: "",
				pw: "",
			});
			setErrors({});
			
			// Redirect based on user role
			const userRole = AuthService.getUserRole();
			if (userRole === "admin") {
				navigate("/admin");
			} else {
				navigate("/dashboard");
			}
		} catch (error: any) {
			setErrors({general: error.message || "Login failed. Please try again."});
		}
    }

    async function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		if (!filter_input_special(e.target.value)) {
			setErrors({...errors, email: "Invalid characters in email"});
			return;
		}
		setLoginData({
			...loginData,
			email: e.target.value
		});
		// Clear email error when user starts typing
		if (errors.email) {
			setErrors({...errors, email: undefined});
		}
    }

    async function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		if (!filter_input_special(e.target.value)) {
			setErrors({...errors, pw: "Invalid characters in password"});
			return;
		}
		setLoginData({
			...loginData,
			pw: e.target.value
		});
		// Clear password error when user starts typing
		if (errors.pw) {
			setErrors({...errors, pw: undefined});
		}
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center py-12 px-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg mb-4 mx-auto">
						<Heart className="w-6 h-6 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mindful</h1>
					<p className="text-slate-600 dark:text-slate-400 mt-2">MINDS Volunteer Management</p>
				</div>

				{/* Login Card */}
				<div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
					<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
					<p className="text-slate-600 dark:text-slate-400 mb-6">Sign in to your account to continue</p>

					{/* General Error */}
					{errors.general && (
						<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
							<AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
							<p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Email Input */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Email Address
							</label>
							<input 
								type="email" 
								name="email" 
								value={loginData.email} 
								placeholder="you@example.com" 
								onChange={handleChangeEmail}
								className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
									errors.email
										? "border-red-300 dark:border-red-600 focus:ring-red-500"
										: "border-slate-300 dark:border-slate-600 focus:ring-blue-500"
								}`}
							/>
							{errors.email && (
								<p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
									<AlertCircle className="w-4 h-4" />
									{errors.email}
								</p>
							)}
						</div>

						{/* Password Input */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Password
							</label>
							<div className="relative">
								<input 
									type={showPassword ? "text" : "password"} 
									name="password" 
									value={loginData.pw} 
									placeholder="••••••••" 
									onChange={handleChangePassword}
									className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all pr-12 ${
										errors.pw
											? "border-red-300 dark:border-red-600 focus:ring-red-500"
											: "border-slate-300 dark:border-slate-600 focus:ring-blue-500"
									}`}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
							{errors.pw && (
								<p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
									<AlertCircle className="w-4 h-4" />
									{errors.pw}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<button 
							type="submit"
							className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-6"
						>
							Sign In
						</button>
					</form>

					{/* Divider */}
					<div className="flex items-center my-6">
						<div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
						<span className="px-3 text-sm text-slate-600 dark:text-slate-400">Don't have an account?</span>
						<div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
					</div>

					{/* Signup Link */}
					<button
						onClick={() => navigate("/auth/signup")}
						className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold py-3 rounded-lg transition-all duration-300"
					>
						Create Account
					</button>
				</div>
			</div>
		</div>
    )
}

export default Login