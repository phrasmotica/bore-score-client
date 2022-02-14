import { useState } from "react"
import { Form } from "semantic-ui-react"

interface AddPlayerProps {
    onAddedPlayer: () => void
}

export const AddPlayer = (props: AddPlayerProps) => {
    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")

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
            .then(props.onAddedPlayer)
            .then(() => setUsername(""))
            .then(() => setDisplayName(""))
    }

    return (
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

                <Form.Button>Submit</Form.Button>
            </Form>
        </div>
    )
}
