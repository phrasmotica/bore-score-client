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

    const { mutate: login, isLoading: isLoggingIn } = useLogin(data => {
        setToken(data.token)
        navigate(props.redirect || "/")
    })

    const { mutate: createUser, isLoading: isSigningUp } = useSignup(() => {
        // log in after successful sign up
        login({
            email: email,
            password: password,
        })
    })

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")

    const [passwordAgain, setPasswordAgain] = useState("")
    const [passwordAgainDirty, setPasswordAgainDirty] = useState(false)

    const formComplete = useMemo(
        () => email.length > 0 && username.length > 0 && displayName.length > 0 && password.length > 0 && passwordAgain === password,
        [email, username, displayName, password, passwordAgain])

    const submit = () => {
        if (formComplete) {
            createUser({
                username: username,
                email: email,
                displayName: displayName,
                password: password,
            })
        }
    }

    const handlePasswordAgain = (str: string) => {
        setPasswordAgain(str)
        setPasswordAgainDirty(true)
    }

    // TODO: add form validation

    const isLoading = useMemo(() => isSigningUp || isLoggingIn, [isSigningUp, isLoggingIn])

    return (
        <Form className="signup-form" loading={isLoading} onSubmit={submit}>
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
                label="Display Name"
                placeholder="Display Name"
                id="form-input-display-name"
                value={displayName}
                onChange={(e, data) => setDisplayName(data.value)}
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
                onChange={(e, data) => handlePasswordAgain(data.value)}
                error={passwordAgainDirty && passwordAgain !== password}
            />

            <Form.Button fluid color="blue" disabled={!formComplete}>
                Sign Up
            </Form.Button>
        </Form>
    )
}
