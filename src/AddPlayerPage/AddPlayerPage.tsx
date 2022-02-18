import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Icon } from "semantic-ui-react"

import { PlayersList } from "../PlayersList"

import { Player } from "../models/Player"
import { fetchPlayers } from "../FetchHelpers"

export const AddPlayerPage = () => {
    const [players, setPlayers] = useState<Player[]>([])

    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        fetchPlayers()
            .then(setPlayers)
    }, [])

    const usernameIsAvailable = () => !players.map(p => p.username).includes(username)

    const formIsComplete = () => username.length > 0 && usernameIsAvailable() && displayName.length > 0

    const submit = () => {
        fetch("http://localhost:8000/players", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                displayName: displayName,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((newPlayer: Player) => navigate(`/?player=${newPlayer.username}`))
    }

    return (
        <div className="add-player-page">
            <h2>Add Player</h2>

            <div className="add-player-page-body">
                <div className="sidebar">
                    <PlayersList players={players} />
                </div>

                <Form onSubmit={submit}>
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid
                            error={!usernameIsAvailable()}
                            label="Username"
                            placeholder="Username"
                            value={username}
                            onChange={(e, { value }) => setUsername(value)} />

                        <Form.Input
                            fluid
                            label="Display name"
                            placeholder="Display name"
                            value={displayName}
                            onChange={(e, { value }) => setDisplayName(value)} />
                    </Form.Group>

                    <Form.Button
                        icon
                        fluid
                        color="teal"
                        disabled={!formIsComplete()}>
                        <span>Add Player&nbsp;</span>
                        <Icon name="add user" />
                    </Form.Button>
                </Form>
            </div>
        </div>
    )
}
