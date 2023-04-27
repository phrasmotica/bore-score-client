import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

import { parseToken } from "../Auth"
import { useUser } from "../FetchHelpers"
import { useTitle } from "../Hooks"
import { PlayerImage } from "../PlayerImage"

import "./ProfilePage.css"

export const ProfilePage = () => {
    useTitle("My Profile")

    const token = parseToken()
    const username = token?.username || ""

    const { user } = useUser(username)

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

    return (
        <div className="profile-page">
            <h1>My Profile</h1>

            <div className="content">
                <div className="left">
                    <PlayerImage />

                    {token && <div>
                        <Link to="/me-edit">
                            <Button fluid color="teal">
                                Edit Profile
                            </Button>
                        </Link>
                    </div>}
                </div>

                <div className="details">
                    <h3>{user.username}</h3>
                    {isCurrentUser && <p className="email">{user.email}</p>}
                </div>
            </div>
        </div>
    )
}
