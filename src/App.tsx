import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SemanticToastContainer } from "react-semantic-toasts"

import { Navbar } from "./Navbar"

import { GameDetailsPage } from "./GameDetailsPage/GameDetailsPage"
import { GamesPage } from "./GamesPage/GamesPage"
import { GroupDetailsPage } from "./GroupDetailsPage/GroupDetailsPage"
import { GroupLeaderboardPage } from "./GroupLeaderboardPage/GroupLeaderboardPage"
import { GroupsPage } from "./GroupsPage/GroupsPage"
import { HomePage } from "./HomePage/HomePage"
import { LoginPage } from "./LoginPage/LoginPage"
import { PlayerDetailsPage } from "./PlayerDetailsPage/PlayerDetailsPage"
import { ProfileEditPage } from "./ProfileEditPage/ProfileEditPage"
import { ProfilePage } from "./ProfilePage/ProfilePage"
import { ResultsPage } from "./ResultsPage/ResultsPage"
import { SignupPage } from "./SignupPage/SignupPage"

import "./App.css"

const App = () => (
    <div className="app-container">
        <div className="content">
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/me" element={<ProfilePage />} />
                    <Route path="/me-edit" element={<ProfileEditPage />} />
                    <Route path="/players/:username" element={<PlayerDetailsPage />} />
                    <Route path="/groups/:groupId/leaderboards" element={<GroupLeaderboardPage />} />
                    <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
                    <Route path="/games/:gameId" element={<GameDetailsPage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                </Routes>
            </BrowserRouter>
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
