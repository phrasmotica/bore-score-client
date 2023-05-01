import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { SemanticToastContainer } from "react-semantic-toasts"
import { Button } from "semantic-ui-react"

import { ResultsList } from "../ResultsPage/ResultsList"

import { parseToken } from "../Auth"
import { getPlayers, getResults, useGames, useGroups, useUser } from "../FetchHelpers"
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

    // TODO: add error handling
    const { data: players } = useQuery({
        queryKey: ["players"],
        queryFn: () => getPlayers(),
    })

    // TODO: add error handling
    const { data: results } = useQuery({
        queryKey: ["results"],
        queryFn: () => getResults(username),
    })

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
                        games={games}
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
