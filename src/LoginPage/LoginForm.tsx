import { useState } from "react"
import { useNavigate } from "react-router"
import { Form } from "semantic-ui-react"

import { setToken } from "../Auth"
import { useLogin } from "../Mutations"

interface LoginFormProps {
    redirect?: string
}

export const LoginForm = (props: LoginFormProps) => {
    const navigate = useNavigate()

    const { mutate: login, isLoading } = useLogin(data => {
        setToken(data.token)
        navigate(props.redirect || "/")
    })

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const formComplete = () => email.length > 0 && password.length > 0

    const submit = () => login({
        email: email,
        password: password,
    })

    return (
        <Form className="login-form" onSubmit={submit} loading={isLoading}>
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

            <Form.Button fluid color="blue" disabled={!formComplete()}>
                Login
            </Form.Button>
        </Form>
    )
}
