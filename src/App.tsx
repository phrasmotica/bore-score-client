import { Icon, Menu } from "semantic-ui-react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AddGamePage } from "./AddGamePage/AddGamePage"
import { AddPlayerPage } from "./AddPlayerPage/AddPlayerPage"
import { AddResultPage } from "./AddResultPage/AddResultPage"
import { GameDetailsPage } from "./GameDetailsPage/GameDetailsPage"
import { GamesPage } from "./GamesPage/GamesPage"
import { GroupDetailsPage } from "./GroupDetailsPage/GroupDetailsPage"
import { HomePage } from "./HomePage/HomePage"
import { PlayerDetailsPage } from "./PlayerDetailsPage/PlayerDetailsPage"
import { ResultsPage } from "./ResultsPage/ResultsPage"

import "./App.css"

const App = () => {
    const renderMenu = () => (
        <Menu fluid>
            <Menu.Item header href="/">
                <Icon name="calculator" />
                BoreScore
            </Menu.Item>

            <Menu.Item href="/">
                Home
            </Menu.Item>

            <Menu.Item href="/add-player">
                Add Player
            </Menu.Item>

            <Menu.Item href="/games">
                Games
            </Menu.Item>

            <Menu.Item href="/add-game">
                Add Game
            </Menu.Item>

            <Menu.Item href="/results">
                Results
            </Menu.Item>

            <Menu.Item href="/add-result">
                Add Result
            </Menu.Item>
        </Menu>
    )

    // TODO: implement groups page

    return (
        <div className="app-container">
            {renderMenu()}

            <div className="content">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/players/:username" element={<PlayerDetailsPage />} />
                        <Route path="/add-player" element={<AddPlayerPage />} />
                        <Route path="/games/:name" element={<GameDetailsPage />} />
                        <Route path="/games" element={<GamesPage />} />
                        <Route path="/add-game" element={<AddGamePage />} />
                        <Route path="/groups/:name" element={<GroupDetailsPage />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="/add-result" element={<AddResultPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App
