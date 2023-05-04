import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Button } from "semantic-ui-react"

import { parseToken, removeToken } from "./Auth"

export const Navbar = () => {
    const token = parseToken()
    const username = token?.username || ""

    const logOut = () => {
        removeToken()
        window.dispatchEvent(new Event("storage"))
    }

    useEffect(() => {
        const handleStorage = () => {
            window.location.reload()
        }

        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])

    const location = useLocation()

    let loginLink = "/login"
    if (location.pathname) {
        loginLink += `?redirect=${location.pathname}`
    }

    return (
        <Menu fluid>
            <Menu.Item header>
                <Link to="/">
                    BoreScore
                </Link>
            </Menu.Item>

            <Menu.Item>
                <Link to="/games">
                    Games
                </Link>
            </Menu.Item>

            <Menu.Item>
                <Link to="/results">
                    Results
                </Link>
            </Menu.Item>

            <Menu.Item>
                <Link to="/groups">
                    Groups
                </Link>
            </Menu.Item>

            <Menu.Item>
                <Link to="/scorecard">
                    Scorecard
                </Link>
            </Menu.Item>

            {!token && <Menu.Menu position="right">
                <Menu.Item>
                    <Link to={loginLink}>
                        Log In
                    </Link>
                </Menu.Item>
            </Menu.Menu>}

            {token && <Menu.Menu position="right">
                <Menu.Item>
                    <Link to="/admin">
                        Admin
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link to="/me">
                        <strong>{username}</strong>
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Button color="red" onClick={logOut}>
                        Log Out
                    </Button>
                </Menu.Item>
            </Menu.Menu>}
        </Menu>
    )
}
