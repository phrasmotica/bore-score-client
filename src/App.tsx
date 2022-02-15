import { Icon, Menu, Segment } from "semantic-ui-react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AddPlayerPage } from "./AddPlayerPage/AddPlayerPage"
import { AddResultPage } from "./AddResultPage/AddResultPage"
import { PlayersPage } from "./PlayersPage/PlayersPage"
import { ResultsPage } from "./ResultsPage/ResultsPage"

import "./App.css"

const App = () => {
    const renderMenu = (page: string) => (
        <Menu fluid>
            <Menu.Item header>
                <Icon name="calculator" />
                BoreScore
            </Menu.Item>

            <Menu.Item href="/" active={page === "players"}>
                Players
            </Menu.Item>

            <Menu.Item href="/add-player" active={page === "add-player"}>
                Add Player
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
                            <Route path="/" element={renderMenu("players")} />
                            <Route path="/add-player" element={renderMenu("add-player")} />
                            <Route path="/results" element={renderMenu("results")} />
                            <Route path="/add-result" element={renderMenu("add-result")} />
                        </Routes>
                    </BrowserRouter>

                    <Segment>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<PlayersPage />} />
                                <Route path="/add-player" element={<AddPlayerPage />} />
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
