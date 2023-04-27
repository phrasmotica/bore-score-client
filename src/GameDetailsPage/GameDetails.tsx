import moment from "moment"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Button, Header, Icon, Modal, Table } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GameImage } from "../GameImage"

import { getHeaders } from "../Auth"
import { displayDateValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { LinkType } from "../models/LinkType"
import { WinMethod } from "../models/WinMethod"

interface GameDetailsProps {
    game: Game
    linkTypes: LinkType[]
    winMethod: WinMethod
}

export const GameDetails = (props: GameDetailsProps) => {
    const [showAddResultModal, setShowAddResultModal] = useState(false)
    const [showDeletePrompt, setShowDeletePrompt] = useState(false)

    let navigate = useNavigate()

    let game = props.game

    const deleteGame = () => {
        fetch(`${process.env.REACT_APP_API_URL}/games/${game.name}`, {
            method: "DELETE",
            headers: getHeaders(),
        })
            .then(() => navigate("/games"))
    }

    let playersStr = `${game.minPlayers}-${game.maxPlayers}`
    if (game.minPlayers === game.maxPlayers) {
        playersStr = game.minPlayers.toString()
    }

    const renderDeletePrompt = () => (
        <Modal
            onClose={() => setShowDeletePrompt(false)}
            open={showDeletePrompt}
            size="mini">
            <Header icon>
                <Icon name="warning" />
                Delete Game
            </Header>
            <Modal.Content>
                <p>
                    Are you sure you want to delete {game.displayName}?
                    This will also delete all results for {game.displayName}!
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" onClick={deleteGame}>
                    <Icon name="checkmark" />
                    Yes
                </Button>

                <Button color="red" onClick={() => setShowDeletePrompt(false)}>
                    <Icon name="remove" />
                    No
                </Button>
            </Modal.Actions>
        </Modal>
    )

    let imageSrc = game.imageLink || "https://e.snmc.io/i/600/s/9f6d3d17acac6ce20993eb158c203e4b/5662600/godspeed-you-black-emperor-lift-yr-skinny-fists-like-antennas-to-heaven-cover-art.jpg"

    return (
        <div className="game-details">
            <AddResultModal game={props.game.name} open={showAddResultModal} setOpen={setShowAddResultModal} />
            {renderDeletePrompt()}

            <div className="content">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />

                    <Button
                        icon
                        fluid
                        color="teal"
                        onClick={() => setShowAddResultModal(true)}>
                        <span>Submit Result&nbsp;</span>
                        <Icon name="edit" />
                    </Button>

                    <Button
                        icon
                        fluid
                        color="red"
                        onClick={() => setShowDeletePrompt(true)}>
                        <span>Delete Game&nbsp;</span>
                        <Icon name="remove" />
                    </Button>
                </div>

                <div>
                    <h3 className="display-name-header">
                        {game.displayName}
                    </h3>

                    {game.synopsis.length > 0 && <h5 className="game-synopsis">
                        {game.synopsis}
                    </h5>}

                    <p className="description">
                        {game.description}
                    </p>

                    <div className="links">
                        {game.links.map((l, i) => {
                            if (l.link.length <= 0) {
                                return null
                            }

                            let linkType = props.linkTypes.find(lt => lt.name === l.type)!.displayName

                            return (
                                <div key={i}>
                                    <em>
                                        <a href={l.link} target="_blank" rel="noreferrer">
                                            {linkType}
                                        </a>
                                    </em>
                                </div>
                            )
                        })}
                    </div>

                    <p className="time-created">
                        <em>Added: {displayDateValue(moment.unix(game.timeCreated))}</em>
                    </p>

                    <Table celled color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={8}>Players</Table.HeaderCell>
                                <Table.HeaderCell width={8}>Win Method</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{playersStr}</Table.Cell>
                                <Table.Cell>{props.winMethod.displayName}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}
