import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { Form } from "semantic-ui-react"

import { setToken } from "../Auth"
import { useLogin, useSignup } from "../Mutations"

interface SignupFormProps {
    redirect?: string
}

export const SignupForm = (props: SignupFormProps) => {
    const navigate = useNavigate()

    const { mutate: login } = useLogin(data => {
        setToken(data.token)
        navigate(props.redirect || "/")
    })

    const { mutate: createUser } = useSignup(data => {
        // log in after successful sign up
        login({
            email: data.email,
            password: password,
        })
    })

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    const formComplete = useMemo(
        () => email.length > 0 && password.length > 0 && passwordAgain === password,
        [email, password, passwordAgain])

    const submit = () => createUser({
        username: username,
        email: email,
        password: password,
    })

    // TODO: add form validation

    return (
        <Form className="signup-form" onSubmit={submit}>
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
                label="Username"
                placeholder="Username"
                id="form-input-username"
                value={username}
                onChange={(e, data) => setUsername(data.value)}
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

            <Form.Input
                fluid
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                id="form-input-confirm-password"
                value={passwordAgain}
                onChange={(e, data) => setPasswordAgain(data.value)}
            />

            <Form.Button fluid color="blue" disabled={!formComplete}>
                Sign Up
            </Form.Button>
        </Form>
    )
}
