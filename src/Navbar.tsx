import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Dropdown } from "semantic-ui-react"

import { parseToken, removeToken } from "./Auth"

export const Navbar = () => {
    const token = parseToken()

    const logOut = () => {
        removeToken()
        window.dispatchEvent(new Event("storage"))

        // TODO: redirect to a non-authed page. Maybe login page or home page?
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

            {!token && <Menu.Menu position="right">
                <Menu.Item>
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link to={loginLink}>
                        Log In
                    </Link>
                </Menu.Item>
            </Menu.Menu>}

            {token && <Menu.Menu position="right">
                <Dropdown item simple text="My Account">
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to="/me">
                                My Profile
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item>
                            <Link to="/me-edit">
                                Account Settings
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item onClick={logOut}>
                            Log Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>}
        </Menu>
    )
}
