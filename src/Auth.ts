import jwtDecode from "jwt-decode"

// TODO: store securely (e.g. https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)
export const getToken = () => sessionStorage.getItem("token") || ""
export const setToken = (token: string) => sessionStorage.setItem("token", token)
export const removeToken = () => sessionStorage.removeItem("token")

export const parseToken = () => {
    let token = getToken()
    if (!token) {
        return null
    }

    try {
        return jwtDecode<AuthToken>(token)
    }
    catch {
        return null
    }
}

export const getHeaders = () => {
    let headers = new Headers()

    let token = getToken()
    if (token) {
        headers.set("Authorization", `Bearer ${token}`)
    }

    return headers
}

interface AuthToken {
    username: string
    email: string
    permissions: string[]
    exp: number
}
