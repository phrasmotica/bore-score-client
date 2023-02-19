import { Menu } from "semantic-ui-react"
import { HashRouter, Link, Route, Routes } from "react-router-dom"

import { AddGamePage } from "./AddGamePage/AddGamePage"
import { AddPlayerPage } from "./AddPlayerPage/AddPlayerPage"
import { GameDetailsPage } from "./GameDetailsPage/GameDetailsPage"
import { GamesPage } from "./GamesPage/GamesPage"
import { GroupDetailsPage } from "./GroupDetailsPage/GroupDetailsPage"
import { HomePage } from "./HomePage/HomePage"
import { PlayerDetailsPage } from "./PlayerDetailsPage/PlayerDetailsPage"
import { ResultsPage } from "./ResultsPage/ResultsPage"
import { ScorecardPage } from "./ScorecardPage/ScorecardPage"

import "./App.css"

const App = () => {
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
                <Link to="/add-player">
                    Add Player
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
                <Link to="/scorecard">
                    Scorecard
                </Link>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="app-container">
            <div className="content">
                <HashRouter basename="/">
                    {renderMenu()}

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/players/:username" element={<PlayerDetailsPage />} />
                        <Route path="/add-player" element={<AddPlayerPage />} />
                        <Route path="/groups/:name" element={<GroupDetailsPage />} />
                        <Route path="/games/:name" element={<GameDetailsPage />} />
                        <Route path="/games" element={<GamesPage />} />
                        <Route path="/add-game" element={<AddGamePage />} />
                        <Route path="/groups/:name" element={<GroupDetailsPage />} />
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
