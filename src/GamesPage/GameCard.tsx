import { Link } from "react-router-dom"
import { Table, Button, Icon, Label } from "semantic-ui-react"

import { parseToken } from "../Auth"
import { GameImage } from "../GameImage"
import { useWinMethods } from "../QueryHelpers"

import { Game } from "../models/Game"

interface GameCardProps {
    game: Game
    addResult: (game: string) => void
}

export const GameCard = (props: GameCardProps) => {
    const token = parseToken()

    const { data: winMethods } = useWinMethods()

    let game = props.game

    let winMethod = (winMethods ?? []).find(w => w.name === game.winMethod)

    const addResult = () => props.addResult(game.name)

    const renderWinMethodLabel = (game: Game) => {
        return (
            <Label className="win-method-label">
                {winMethod?.displayName ?? game.winMethod}
            </Label>
        )
    }

    const renderPlayersLabel = (game: Game) => {
        let playersStr = `${game.minPlayers}-${game.maxPlayers}`
        if (game.minPlayers === game.maxPlayers) {
            playersStr = game.minPlayers.toString()
        }

        return (
            <Label color="green">{playersStr} players</Label>
        )
    }

    return (
        <Table.Row key={game.name}>
            <Table.Cell>
                <GameImage imageSrc={game.imageLink} />
            </Table.Cell>

            <Table.Cell>
                <div className="game-header">
                    <Link to={`/games/${game.name}`}>
                        <h3>{game.displayName}</h3>
                    </Link>

                    <div className="labels">
                        {renderPlayersLabel(game)}
                        {renderWinMethodLabel(game)}
                    </div>
                </div>
                {(game.synopsis || game.description || "N/A").substring(0, 200)}
            </Table.Cell>

            {token && <Table.Cell>
                <Button
                    icon
                    fluid
                    color="teal"
                    onClick={addResult}>
                    <span>Submit Result&nbsp;</span>
                    <Icon name="edit" />
                </Button>
            </Table.Cell>}
        </Table.Row>
    )
}
