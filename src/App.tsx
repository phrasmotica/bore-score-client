import { HashRouter, Route, Routes } from "react-router-dom"
import { SemanticToastContainer } from "react-semantic-toasts"

import { Navbar } from "./Navbar"

import { AdminPage } from "./AdminPage/AdminPage"
import { GameDetailsPage } from "./GameDetailsPage/GameDetailsPage"
import { GamesPage } from "./GamesPage/GamesPage"
import { GroupDetailsPage } from "./GroupDetailsPage/GroupDetailsPage"
import { GroupsPage } from "./GroupsPage/GroupsPage"
import { HomePage } from "./HomePage/HomePage"
import { LoginPage } from "./LoginPage/LoginPage"
import { PlayerDetailsPage } from "./PlayerDetailsPage/PlayerDetailsPage"
import { ProfilePage } from "./ProfilePage/ProfilePage"
import { ResultsPage } from "./ResultsPage/ResultsPage"

import "./App.css"

const App = () => (
    <div className="app-container">
        <div className="content">
            <HashRouter basename="/">
                <Navbar />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/me" element={<ProfilePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/players/:username" element={<PlayerDetailsPage />} />
                    <Route path="/groups/:name" element={<GroupDetailsPage />} />
                    <Route path="/games/:name" element={<GameDetailsPage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/groups/:name" element={<GroupDetailsPage />} />
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                </Routes>
            </HashRouter>
        </div>

        <SemanticToastContainer position="bottom-right" maxToasts={3} />

        <footer>
            <a href="https://www.flaticon.com/free-icons/dice" title="dice icons">
                Dice icons created by juicy_fish - Flaticon
            </a>
        </footer>
    </div>
)

export default App
