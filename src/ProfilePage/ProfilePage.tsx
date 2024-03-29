import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

import { InvitationsList } from "../InvitationsList/InvitationsList"
import { ResultsList } from "../ResultsPage/ResultsList"

import { parseToken } from "../Auth"
import { useTitle } from "../Hooks"
import { PlayerImage } from "../PlayerImage"
import { useGames, useGroupInvitations, useGroups, usePlayer, usePlayers, useResultsForUser } from "../QueryHelpers"

import { sortResultsByRecent } from "../models/Result"

import "react-semantic-toasts/styles/react-semantic-alert.css"
import "./ProfilePage.css"

export const ProfilePage = () => {
    useTitle("My Profile")

    const token = parseToken()
    const username = token?.username || ""

    const { data: games } = useGames()
    const { data: groups } = useGroups()
    const { data: invitations } = useGroupInvitations(username)
    const { data: players } = usePlayers()
    const { data: player } = usePlayer(username)
    const { data: results } = useResultsForUser(username)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login?redirect=" + encodeURIComponent(location.pathname))
        }
    }, [token, navigate, location.pathname])

    if (!token || !player) {
        return null
    }

    let resultsToShow = sortResultsByRecent(results ?? []).slice(0, 5)

    return (
        <div className="profile-page">
            <h1>My Profile</h1>

            <div className="content">
                <div className="left">
                    <h3>{player.displayName}</h3>

                    <PlayerImage imageSrc={player.profilePicture} />

                    <div>
                        <Link to="/me-edit">
                            <Button fluid color="teal">
                                Edit Profile
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="details">
                    <h3>Recent Results</h3>

                    <ResultsList
                        approvals
                        games={games ?? []}
                        groups={groups ?? []}
                        players={players ?? []}
                        results={resultsToShow} />

                    <h3>Group Invitations</h3>

                    <InvitationsList
                        invitations={invitations ?? []}
                        groups={groups ?? []} />
                </div>
            </div>
        </div>
    )
}
