import { ReactNode } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SemanticToastContainer } from "react-semantic-toasts"

import { Navbar } from "./Navbar"

import { AuthCallback } from "./AuthCallback"
import { GameDetailsPage } from "./GameDetailsPage/GameDetailsPage"
import { GamesPage } from "./GamesPage/GamesPage"
import { GroupDetailsPage } from "./GroupDetailsPage/GroupDetailsPage"
import { GroupLeaderboardPage } from "./GroupLeaderboardPage/GroupLeaderboardPage"
import { GroupsPage } from "./GroupsPage/GroupsPage"
import { HomePage } from "./HomePage/HomePage"
import { PlayerDetailsPage } from "./PlayerDetailsPage/PlayerDetailsPage"
import { ProfileEditPage } from "./ProfileEditPage/ProfileEditPage"
import { ProfilePage } from "./ProfilePage/ProfilePage"
import { Protected } from "./Protected"
import { ResultsPage } from "./ResultsPage/ResultsPage"

import "./App.css"

const App = () => (
    <div className="app-container">
        <div className="content">
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/openid/callback" element={<AuthCallback />} />
                    {/* <Route path="/signup" element={<SignupPage />} /> */}
                    {/* <Route path="/login" element={<LoginPage />} /> */}

                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/results" element={<ResultsPage />} />

                    <Route path="/games/:gameId" element={<GameDetailsPage />} />

                    <Route path="/players/:username" element={<PlayerDetailsPage />} />

                    <Route path="/me" element={protect(<ProfilePage />)} />
                    <Route path="/me-edit" element={protect(<ProfileEditPage />)} />

                    <Route path="/groups/:groupId/leaderboards" element={<GroupLeaderboardPage />} />
                    <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
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

const protect = (component: ReactNode) => <Protected children={component} />

export default App
