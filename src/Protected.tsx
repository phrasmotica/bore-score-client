import { ReactNode, useEffect, useState } from "react"
import { hasAuthParams, useAuth } from "react-oidc-context"

// Adapted from this example project:
// https://github.com/authts/sample-keycloak-react-oidc-context
export const Protected = (props: { children: ReactNode }) => {
    const auth = useAuth()
    const [hasTriedSignin, setHasTriedSignin] = useState(false)

    /**
     * Do auto sign in.
     *
     * See {@link https://github.com/authts/react-oidc-context?tab=readme-ov-file#automatic-sign-in}
     */
    useEffect(() => {
        if (
            !(
                hasAuthParams() ||
                auth.isAuthenticated ||
                auth.activeNavigator ||
                auth.isLoading ||
                hasTriedSignin
            )
        ) {
            void auth.signinRedirect({
                redirect_uri: `${window.location.origin}/openid/callback?redirectUri=${window.location.pathname}`,
            })

            setHasTriedSignin(true)
        }
    }, [auth, hasTriedSignin])

    return (
        <>
            {auth.error ? (
                <>
                    <h1>We've hit a snag</h1>
                    <h2>{auth.error?.message}</h2>
                </>
            ) : auth.isLoading ? (
                <>
                    <h1>Loading...</h1>
                </>
            ) : auth.isAuthenticated ? (
                props.children
            ) : (
                <>
                    <h1>We've hit a snag</h1>
                    <h2>Unable to sign in</h2>
                </>
            )}
        </>
    )
}
