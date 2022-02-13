import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"

import { PlayersList } from "./PlayersList"
import { PlayerSummary } from "./PlayerSummary"

import "./App.css"

const App = () => (
    <div className="App">
        <header className="App-header">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PlayersList />}>
                    </Route>

                    <Route path="/players/:username" element={<PlayerSummary />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </header>
    </div>
)

export default App
