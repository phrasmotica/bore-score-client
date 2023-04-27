import { useSearchParams } from "react-router-dom"

import { LoginForm } from "./LoginForm"

import { useTitle } from "../Hooks"

import "./LoginPage.css"

export const LoginPage = () => {
    useTitle("Login")

    const [searchParams] = useSearchParams()

    let redirect = searchParams.get("redirect") || ""
    if (redirect) {
        redirect = decodeURIComponent(redirect)
    }

    return (
        <div className="login-page">
            <h1>Login</h1>

            <div className="login-page-content">
                <LoginForm redirect={redirect} />
            </div>
        </div>
    )
}
