import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Icon } from "semantic-ui-react"

import { fetchGames, fetchWinMethods } from "../FetchHelpers"
import { GamesList } from "../GamesList"

import { Game, WinMethod } from "../models/Game"

export const AddGamePage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [winMethods, setWinMethods] = useState<WinMethod[]>([])

    const [name, setName] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [description, setDescription] = useState("")
    const [minPlayers, setMinPlayers] = useState(1)
    const [maxPlayers, setMaxPlayers] = useState(2)
    const [winMethod, setWinMethod] = useState<WinMethod>()

    const navigate = useNavigate()

    useEffect(() => {
        fetchGames()
            .then(setGames)

        fetchWinMethods()
            .then(setWinMethods)
    }, [])

    useEffect(() => {
        if (winMethods.length > 0) {
            setWinMethod(winMethods[0])
        }
    }, [winMethods])

    const nameIsAvailable = () => !games.map(g => g.name).includes(name)

    const formIsComplete = () => {
        return name.length > 0
            && nameIsAvailable()
            && minPlayers > 0
            && maxPlayers >= minPlayers
            && winMethod !== undefined
    }

    const submit = () => {
        fetch("http://localhost:8000/games", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                synopsis: synopsis,
                description: description,
                minPlayers: minPlayers,
                maxPlayers: maxPlayers,
                winMethod: winMethod,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((newGame: Game) => newGame)
            .then(newGame => navigate(`/games?gameId=${newGame.id}`))
    }

    const createWinMethodOptions = () => winMethods.map(w => ({ key: w, text: w, value: w }))

    return (
        <div className="add-game-page">
            <h2>Add Game</h2>

            <div className="add-game-page-body">
                <div className="sidebar">
                    <GamesList games={games} />
                </div>

                <Form onSubmit={submit}>
                    <Form.Input
                        error={!nameIsAvailable()}
                        label="Name"
                        placeholder="Name"
                        value={name}
                        onChange={(e, { value }) => setName(value)} />

                    <Form.Input
                        label="Synopsis"
                        placeholder="Synopsis"
                        value={synopsis}
                        onChange={(e, { value }) => setSynopsis(value)} />

                    <Form.Group widths="equal">
                        <Form.Input
                            type="number"
                            label="Minimum Players"
                            value={minPlayers}
                            min={1}
                            onChange={(e, { value }) => setMinPlayers(Number(value))} />

                        <Form.Input
                            type="number"
                            label="Maximum Players"
                            value={maxPlayers}
                            min={minPlayers}
                            onChange={(e, { value }) => setMaxPlayers(Number(value))} />

                        <Form.Dropdown
                            selection
                            type="number"
                            label="Win Method"
                            options={createWinMethodOptions()}
                            value={winMethod}
                            onChange={(e, { value }) => setWinMethod(value as WinMethod)} />
                    </Form.Group>

                    <Form.TextArea
                        label="Description"
                        placeholder="Description"
                        value={description}
                        onChange={(e, { value }) => setDescription(String(value))} />

                    <Form.Button
                        icon
                        fluid
                        color="teal"
                        disabled={!formIsComplete()}>
                        <span>Add Game&nbsp;</span>
                        <Icon name="check" />
                    </Form.Button>
                </Form>
            </div>
        </div>
    )
}
