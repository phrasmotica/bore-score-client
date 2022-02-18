import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Game } from "../models/Game"
import { fetchGames } from "../FetchHelpers"
import { GamesList } from "../GamesList"

export const AddGamePage = () => {
    const [games, setGames] = useState<Game[]>([])

    const [displayName, setDisplayName] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        fetchGames()
            .then(setGames)
    }, [])

    const displayNameIsAvailable = () => !games.map(g => g.name).includes(displayName)

    const formIsComplete = () => displayName.length > 0 && displayNameIsAvailable()

    const submit = () => {
        fetch("http://localhost:8000/games", {
            method: "POST",
            body: JSON.stringify({

            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => navigate("/"))
    }

    return (
        <div className="add-game-page">
            <h2>Add Game</h2>

            <div className="add-game-page-body">
                <div className="sidebar">
                    <GamesList games={games} />
                </div>

            </div>
        </div>
    )
}
