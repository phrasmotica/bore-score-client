import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { SemanticToastContainer } from "react-semantic-toasts"
import { Button } from "semantic-ui-react"

import { ResultsList } from "../ResultsPage/ResultsList"

import { parseToken } from "../Auth"
import { useGroups, useUser } from "../FetchHelpers"
import { useTitle } from "../Hooks"
import { PlayerImage } from "../PlayerImage"
import { useGames, usePlayers, useResults } from "../QueryHelpers"

import { sortResultsByRecent } from "../models/Result"

import "react-semantic-toasts/styles/react-semantic-alert.css"
import "./ProfilePage.css"

export const ProfilePage = () => {
    useTitle("My Profile")

    const token = parseToken()
    const username = token?.username || ""

    const { user } = useUser(username)

    const { groups } = useGroups()

    const { data: games } = useGames()
    const { data: players } = usePlayers()
    const { data: results } = useResults()

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login?redirect=" + encodeURIComponent("/me"))
        }
    }, [token, navigate])

    if (!token || !user) {
        return null
    }

    const isCurrentUser = username === user.username

    let resultsToShow = sortResultsByRecent(results ?? []).slice(0, 5)

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
                        approvals
                        games={games ?? []}
                        groups={groups}
                        players={players ?? []}
                        results={resultsToShow}
                        selectedGames={[]}
                        selectedGroups={[]} />
                </div>
            </div>

            <SemanticToastContainer position="bottom-right" maxToasts={3} />
        </div>
    )
}
