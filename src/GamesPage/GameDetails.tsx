import { Button } from "semantic-ui-react"

import { Game } from "../models/Game"

interface GameDetailsProps {
    game: Game
    onDeletedGame: () => void
}

export const GameDetails = (props: GameDetailsProps) => {
    const deleteGame = () => {
        fetch(`http://localhost:8000/games/${props.game.id}`, {
            method: "DELETE"
        })
            .then(props.onDeletedGame)
    }

    return (
        <div className="game-details">
            <h3>{props.game.name}</h3>

            <Button color="red" onClick={deleteGame}>
                Delete Game
            </Button>
        </div>
    )
}
