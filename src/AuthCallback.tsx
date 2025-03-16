import { useEffect } from "react"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router-dom"

export const AuthCallback = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.isAuthenticated) {
            // TODO: this happens after we re-write the browser history in the
            // onSigninCallback (see index.tsx), so we don't redirect to the
            // original page after login. How can we do that instead?
            navigate("/")
        }
    }, [auth, navigate])

    return (
        <h1>
            Processing signin...
        </h1>
    )
}
