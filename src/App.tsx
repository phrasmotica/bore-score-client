import { useEffect } from "react"
import { Button, Menu } from "semantic-ui-react"
import { HashRouter, Link, Route, Routes } from "react-router-dom"

import { AdminPage } from "./AdminPage/AdminPage"
import { GameDetailsPage } from "./GameDetailsPage/GameDetailsPage"
import { GamesPage } from "./GamesPage/GamesPage"
import { GroupDetailsPage } from "./GroupDetailsPage/GroupDetailsPage"
import { GroupsPage } from "./GroupsPage/GroupsPage"
import { HomePage } from "./HomePage/HomePage"
import { LoginPage } from "./LoginPage/LoginPage"
import { PlayerDetailsPage } from "./PlayerDetailsPage/PlayerDetailsPage"
import { ResultsPage } from "./ResultsPage/ResultsPage"
import { ScorecardPage } from "./ScorecardPage/ScorecardPage"

import { getToken, removeToken } from "./Auth"

import "./App.css"

const App = () => {
    const token = getToken()

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

    const renderMenu = () => (
        <Menu fluid>
            <Menu.Item header>
                BoreScore
            </Menu.Item>

            <Menu.Item>
                <Link to="/">
                    Home
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
                    {/* TODO: redirect to current page */}
                    <Link to="/login">
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
                        <strong>username</strong>
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

    return (
        <div className="app-container">
            <div className="content">
                <HashRouter basename="/">
                    {renderMenu()}

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/players/:username" element={<PlayerDetailsPage />} />
                        <Route path="/groups/:name" element={<GroupDetailsPage />} />
                        <Route path="/games/:name" element={<GameDetailsPage />} />
                        <Route path="/games" element={<GamesPage />} />
                        <Route path="/groups/:name" element={<GroupDetailsPage />} />
                        <Route path="/groups" element={<GroupsPage />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="/scorecard" element={<ScorecardPage />} />
                    </Routes>
                </HashRouter>
            </div>

            <footer>
                <a href="https://www.flaticon.com/free-icons/dice" title="dice icons">
                    Dice icons created by juicy_fish - Flaticon
                </a>
            </footer>
        </div>
    )
}

export default App
