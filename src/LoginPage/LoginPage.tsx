import { useSearchParams } from "react-router-dom"
import { useTitle } from "../Hooks"
import { LoginForm } from "./LoginForm"

import "./LoginPage.css"

interface LoginPageProps {
    setToken: (token: string) => void
}

export const LoginPage = (props: LoginPageProps) => {
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
                <LoginForm setToken={props.setToken} redirect={redirect} />
            </div>
        </div>
    )
}
