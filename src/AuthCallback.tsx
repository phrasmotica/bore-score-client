import { useEffect } from "react"
import { useAuth } from "react-oidc-context"
import { useNavigate, useSearchParams } from "react-router-dom"

export const AuthCallback = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    let redirectUri = searchParams.get("redirectUri") || ""
    if (!redirectUri) {
        redirectUri = "/"
    }

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(redirectUri)
        }
    }, [auth, navigate, redirectUri])

    return (
        <h1>
            Processing signin... redirecting to {redirectUri}
        </h1>
    )
}
