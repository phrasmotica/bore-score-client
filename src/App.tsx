import { Icon, Menu, Segment } from "semantic-ui-react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AddPlayerPage } from "./AddPlayerPage/AddPlayerPage"
import { PlayersPage } from "./PlayersPage/PlayersPage"
import { ResultsPage } from "./ResultsPage/ResultsPage"

import "./App.css"

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <div className="app-container">
                    <Menu fluid>
                        <Menu.Item header>
                            <Icon name="calculator" />
                            BoreScore
                        </Menu.Item>

                        <Menu.Item href="/">
                            Players
                        </Menu.Item>

                        <Menu.Item href="/add-player">
                            Add Player
                        </Menu.Item>

                        <Menu.Item href="/results">
                            Results
                        </Menu.Item>
                    </Menu>

                    <Segment>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<PlayersPage />} />
                                <Route path="/add-player" element={<AddPlayerPage />} />
                                <Route path="/results" element={<ResultsPage />} />
                            </Routes>
                        </BrowserRouter>
                    </Segment>
                </div>
            </header>
        </div>
    )
}

export default App
