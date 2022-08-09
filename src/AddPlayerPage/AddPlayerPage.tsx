import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Icon, Input } from "semantic-ui-react"

import { ImagePreview } from "../ImagePreview/ImagePreview"
import { PlayersList } from "../PlayersList"

import { usePlayers } from "../FetchHelpers"
import { useTitle } from "../Hooks"

import { Player } from "../models/Player"

import "./AddPlayerPage.css"

export const AddPlayerPage = () => {
    useTitle("Add Player")

    const { players } = usePlayers()

    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    const navigate = useNavigate()

    const usernameIsAvailable = () => !players.map(p => p.username).includes(username)

    const formIsComplete = () => username.length > 0 && usernameIsAvailable() && displayName.length > 0

    const submit = () => {
        fetch(`${process.env.REACT_APP_API_URL}/players`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                displayName: displayName,
                profilePicture: profilePicture,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((newPlayer: Player) => navigate(`/players/${newPlayer.username}`))
    }

    return (
        <div className="add-player-page">
            <h2>Add Player</h2>

            <div className="add-player-page-body">
                <div className="sidebar">
                    <PlayersList players={players} />
                </div>

                <div className="add-player-form">
                    <div className="add-player-form-inputs">
                        <div className="add-player-form-fields">
                            <Input
                                fluid
                                error={!usernameIsAvailable()}
                                label="Username"
                                placeholder="Username"
                                value={username}
                                onChange={(e, { value }) => setUsername(value)} />

                            <Input
                                fluid
                                label="Display name"
                                placeholder="Display name"
                                value={displayName}
                                onChange={(e, { value }) => setDisplayName(value)} />

                            <Input
                                fluid
                                label={{ color: "blue", content: "Profile Picture" }}
                                placeholder="URL"
                                value={profilePicture}
                                onChange={(e, { value }) => setProfilePicture(value)} />
                        </div>

                        <ImagePreview imageLink={profilePicture} />
                    </div>

                    <Button
                        icon
                        fluid
                        color="teal"
                        disabled={!formIsComplete()}
                        onClick={submit}>
                        <span>Add Player&nbsp;</span>
                        <Icon name="add user" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
