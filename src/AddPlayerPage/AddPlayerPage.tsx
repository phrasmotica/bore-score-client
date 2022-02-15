import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form } from "semantic-ui-react"

export const AddPlayerPage = () => {
    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")

    const navigate = useNavigate()

    const formIsComplete = () => username.length > 0 && displayName.length > 0

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
            .then(() => navigate("/"))
    }

    return (
        <div className="add-player-page">
            <div className="add-player">
                <h2>Add Player</h2>

                <Form onSubmit={submit}>
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid
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
                        color="teal"
                        disabled={!formIsComplete()}>
                        Submit
                    </Form.Button>
                </Form>
            </div>
        </div>
    )
}
