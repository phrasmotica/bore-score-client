import jwtDecode, { JwtPayload } from "jwt-decode"
import { useMemo } from "react"
import { useAuth } from "react-oidc-context"

export const useJwt = () => {
    const auth = useAuth()

    const token = useMemo(() => {
        try {
            // we need to manually decode the token to get its custom KC roles.
            // https://github.com/authts/react-oidc-context/issues/1436#issuecomment-2578281748
            return jwtDecode<JwtToken>(auth.user?.access_token || "")
        }
        catch {
            return null
        }
    }, [auth])

    const roles = useMemo(() =>
        token?.resource_access["borescore-frontend"]?.roles || [],
        [token]
    )

    return {
        roles,
    }
}

interface JwtToken extends JwtPayload {
    resource_access: {
        "borescore-frontend": {
            roles: string[]
        } | undefined
    }
}
