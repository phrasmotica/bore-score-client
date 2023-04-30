import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { SemanticToastContainer } from "react-semantic-toasts"
import { Button } from "semantic-ui-react"

import { ResultsList } from "../ResultsPage/ResultsList"

import { parseToken } from "../Auth"
import { useGames, useGroups, usePlayers, useResults, useUser } from "../FetchHelpers"
import { useTitle } from "../Hooks"
import { PlayerImage } from "../PlayerImage"

import { sortResultsByRecent } from "../models/Result"

import "react-semantic-toasts/styles/react-semantic-alert.css"
import "./ProfilePage.css"

export const ProfilePage = () => {
    useTitle("My Profile")

    const token = parseToken()
    const username = token?.username || ""

    const { user } = useUser(username)

    const { games } = useGames()
    const { groups } = useGroups()
    const { players } = usePlayers()
    const { results } = useResults()

    const navigate = useNavigate()

    useEffect(() => {
        if (!parseToken()) {
            navigate("/login?redirect=" + encodeURIComponent("/me"))
        }
    }, [navigate])

    if (!token || !user) {
        return null
    }

    const isCurrentUser = username === user.username

    let resultsToShow = results.filter(r => r.scores.some(s => s.username === username))
    resultsToShow = sortResultsByRecent(resultsToShow).slice(0, 5)

    return (
        <div className="profile-page">
            <h1>My Profile</h1>

            <div className="content">
                <div className="left">
                    <h3>{user.username}</h3>

                    <PlayerImage />

                    {isCurrentUser && <div>
                        <Link to="/me-edit">
                            <Button fluid color="teal">
                                Edit Profile
                            </Button>
                        </Link>
                    </div>}
                </div>

                <div className="details">
                    <h3>Recent Results</h3>

                    <ResultsList
                        games={games}
                        groups={groups}
                        players={players}
                        results={resultsToShow}
                        selectedGames={[]}
                        selectedGroups={[]} />
                </div>
            </div>

            <SemanticToastContainer position="bottom-right" maxToasts={3} />
        </div>
    )
}
