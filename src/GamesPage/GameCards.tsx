import { useState } from "react"
import { Link } from "react-router-dom"
import { Accordion, Button, Icon } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GameImage } from "../GameImage"

import { Game } from "../models/Game"
import { WinMethod } from "../models/WinMethod"

import "./GameCards.css"

interface GameCardsProps {
    games: Game[]
    winMethods: WinMethod[]
    selectedWinMethods: string[]
    useMinPlayers: boolean
    minPlayers: number
    useMaxPlayers: boolean
    maxPlayers: number
}

export const GameCards = (props: GameCardsProps) => {
    const [selectedGame, setSelectedGame] = useState("")
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    let gamesToShow = [...props.games]

    if (props.selectedWinMethods.length > 0) {
        gamesToShow = gamesToShow.filter(g => props.selectedWinMethods.includes(g.winMethod))
    }

    if (props.useMinPlayers) {
        gamesToShow = gamesToShow.filter(g => g.minPlayers >= props.minPlayers)
    }

    if (props.useMaxPlayers) {
        gamesToShow = gamesToShow.filter(g => g.maxPlayers <= props.maxPlayers)
    }

    const renderGame = (game: Game) => {
        const submitResult = () => {
            setSelectedGame(game.name)
            setShowAddResultModal(true)
        }

        return <GameCard game={game} submitResult={submitResult} />
    }

    return (
        <div className="game-cards">
            <AddResultModal game={selectedGame} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <Accordion styled fluid>
                {gamesToShow.map(renderGame)}
            </Accordion>
        </div>
    )
}

interface GameCardProps {
    game: Game
    submitResult: () => void
}

const GameCard = (props: GameCardProps) => {
    const [open, setOpen] = useState(false)

    let playersStr = `${props.game.minPlayers}-${props.game.maxPlayers}`
    if (props.game.minPlayers === props.game.maxPlayers) {
        playersStr = props.game.minPlayers.toString()
    }

    return (
        <div className="game-card">
            <Accordion.Title active={open} onClick={() => setOpen(o => !o)}>
                <Link to={`/games/${props.game.name}`}>
                    {props.game.displayName}
                </Link>
                <Icon name="dropdown" />
            </Accordion.Title>
            <Accordion.Content active={open}>
                <div className="game-card-content">
                    <GameImage imageSrc={props.game.imageLink} />

                    <div>
                        <div className="text">
                            <div>
                                {props.game.synopsis || props.game.description || "N/A"}
                            </div>

                            <div>
                                {playersStr} player(s)
                            </div>
                        </div>

                        <div className="buttons">
                            <Button
                                icon
                                color="teal"
                                onClick={props.submitResult}>
                                <span>Submit Result&nbsp;</span>
                                <Icon name="edit" />
                            </Button>

                            <Button
                                icon
                                color="blue"
                                onClick={props.submitResult}>
                                <Link to={`/games/${props.game.name}`}>
                                    <span>More Information&nbsp;</span>
                                </Link>
                                <Icon name="info circle" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Accordion.Content>
        </div>
    )
}
