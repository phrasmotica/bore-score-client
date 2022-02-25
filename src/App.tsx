import { Icon, Menu, Segment } from "semantic-ui-react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AddGamePage } from "./AddGamePage/AddGamePage"
import { AddPlayerPage } from "./AddPlayerPage/AddPlayerPage"
import { AddResultPage } from "./AddResultPage/AddResultPage"
import { GamesPage } from "./GamesPage/GamesPage"
import { HomePage } from "./HomePage/HomePage"
import { PlayersPage } from "./PlayersPage/PlayersPage"
import { ResultsPage } from "./ResultsPage/ResultsPage"

import "./App.css"

const App = () => {
    const renderMenu = (page: string) => (
        <Menu fluid>
            <Menu.Item header href="/">
                <Icon name="calculator" />
                BoreScore
            </Menu.Item>

            <Menu.Item href="/" active={page === ""}>
                Home
            </Menu.Item>

            <Menu.Item href="/players" active={page === "players"}>
                Players
            </Menu.Item>

            <Menu.Item href="/add-player" active={page === "add-player"}>
                Add Player
            </Menu.Item>

            <Menu.Item href="/games" active={page === "games"}>
                Games
            </Menu.Item>

            <Menu.Item href="/add-game" active={page === "add-game"}>
                Add Game
            </Menu.Item>

            <Menu.Item href="/results" active={page === "results"}>
                Results
            </Menu.Item>

            <Menu.Item href="/add-result" active={page === "add-result"}>
                Add Result
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="App">
            <header className="App-header">
                <div className="app-container">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={renderMenu("")} />
                            <Route path="/players" element={renderMenu("players")} />
                            <Route path="/add-player" element={renderMenu("add-player")} />
                            <Route path="/games" element={renderMenu("games")} />
                            <Route path="/add-game" element={renderMenu("add-game")} />
                            <Route path="/results" element={renderMenu("results")} />
                            <Route path="/add-result" element={renderMenu("add-result")} />
                        </Routes>
                    </BrowserRouter>

                    <Segment>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/players" element={<PlayersPage />} />
                                <Route path="/add-player" element={<AddPlayerPage />} />
                                <Route path="/games" element={<GamesPage />} />
                                <Route path="/add-game" element={<AddGamePage />} />
                                <Route path="/results" element={<ResultsPage />} />
                                <Route path="/add-result" element={<AddResultPage />} />
                            </Routes>
                        </BrowserRouter>
                    </Segment>
                </div>
            </header>
        </div>
    )
}

export default App
