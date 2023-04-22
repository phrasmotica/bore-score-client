import { useState } from "react"
import { useNavigate } from "react-router"
import { Form } from "semantic-ui-react"

import { setToken } from "../Auth"

interface LoginFormProps {
    redirect?: string
}

interface TokenRequest {
    email: string
    password: string
}

interface TokenResponse {
    token: string
}

export const LoginForm = (props: LoginFormProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const formComplete = () => email.length > 0 && password.length > 0

    const submit = () => {
        const request = {
            email: email,
            password: password,
        } as TokenRequest

        fetch(`${process.env.REACT_APP_API_URL}/token`, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((res: TokenResponse) => {
            setToken(res.token)
            navigate(props.redirect || "/")

            // ensure page reloads after navigation
            window.dispatchEvent(new Event("storage"))
        })
    }

    return (
        <Form className="login-form" onSubmit={submit}>
            <Form.Input
                fluid
                label="Email address"
                placeholder="Email address"
                id="form-input-email"
                value={email}
                onChange={(e, data) => setEmail(data.value)}
            />

            <Form.Input
                fluid
                type="password"
                label="Password"
                placeholder="Password"
                id="form-input-password"
                value={password}
                onChange={(e, data) => setPassword(data.value)}
            />

            <Form.Button disabled={!formComplete()}>
                Login
            </Form.Button>
        </Form>
    )
}
