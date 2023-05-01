import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button, Form, Icon } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { CooperativeScoreForm } from "../AddResultModal/CooperativeScoreForm"
import { CooperativeWinForm } from "../AddResultModal/CooperativeWinForm"
import { IndividualScoreForm } from "../AddResultModal/IndividualScoreForm"
import { IndividualWinForm } from "../AddResultModal/IndividualWinForm"
import { GameImage } from "../GameImage"

import { getPlayers, useGames, useGroups } from "../FetchHelpers"
import { useTitle } from "../Hooks"

import { Game } from "../models/Game"
import { WinMethodName } from "../models/WinMethod"

import "./ScorecardPage.css"

export const ScorecardPage = () => {
    useTitle("Scorecard")

    const [showAddResultModal, setShowAddResultModal] = useState(false)

    const [searchParams] = useSearchParams()

    const { games } = useGames()
    const { groups } = useGroups()

    // TODO: add error handling
    const { data: players } = useQuery({
        queryKey: ["players"],
        queryFn: () => getPlayers(),
    })

    const [game, setGame] = useState<Game>()
    const [useGroup, setUseGroup] = useState(false)
    const [group, setGroup] = useState("")

    const [formData, setFormData] = useState<any>()
    const [formIsComplete, setFormIsComplete] = useState(false)

    useEffect(() => {
        if (games.length > 0) {
            let gameParam = searchParams.get("game")
            let defaultGame = games.find(g => g.name === gameParam) ?? games[0]
            setGame(defaultGame)
        }
    }, [games, searchParams])

    useEffect(() => {
        if (groups.length > 0) {
            let groupParam = searchParams.get("group")

            let groupFromParam = groups.find(g => g.name === groupParam)
            let defaultGroup = groupFromParam ?? groups[0]
            setGroup(defaultGroup.name)

            if (groupFromParam !== undefined) {
                setUseGroup(true)
            }
        }
    }, [groups, searchParams])

    const updateFormData = (isComplete: boolean, formData: any) => {
        setFormIsComplete(isComplete)
        setFormData(formData)
    }

    // TODO: create better forms for tracking score.
    // Add buttons for increasing score by 10/100/1000, etc

    const renderGameForm = () => {
        switch (game?.winMethod) {
            case WinMethodName.IndividualScore:
                return (
                    <IndividualScoreForm
                        players={players ?? []}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.IndividualWin:
                return (
                    <IndividualWinForm
                        players={players ?? []}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.CooperativeScore:
                return (
                    <CooperativeScoreForm
                        players={players ?? []}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.CooperativeWin:
                return (
                    <CooperativeWinForm
                        players={players ?? []}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )
        }

        return null
    }

    let imageSrc = game?.imageLink || "https://e.snmc.io/i/600/s/9f6d3d17acac6ce20993eb158c203e4b/5662600/godspeed-you-black-emperor-lift-yr-skinny-fists-like-antennas-to-heaven-cover-art.jpg"

    let gameOptions = games.map(g => ({
        key: g.name,
        text: g.displayName,
        value: g.name,
    }))

    const setSelectedGame = (name: string) => {
        let game = games.find(g => g.name === name)
        setGame(game)
    }

    const saveAsResult = () => setShowAddResultModal(true)

    return (
        <div className="scorecard-page">
            <AddResultModal
                open={showAddResultModal}
                setOpen={setShowAddResultModal}
                game={game?.name}
                group={group} />

            <h2>Scorecard</h2>

            <div className="scorecard-page-body">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />
                </div>

                <div className="middle">
                    <Form>
                        <Form.Dropdown
                            className="game-picker"
                            search
                            selection
                            label="Game"
                            placeholder="Select game..."
                            options={gameOptions}
                            value={game?.name ?? ""}
                            onChange={(e, { value }) => setSelectedGame(String(value))} />
                    </Form>

                    <Button
                        icon
                        fluid
                        color="teal"
                        onClick={saveAsResult}>
                        <span>Save As Result&nbsp;</span>
                        <Icon name="edit" />
                    </Button>

                    {renderGameForm()}
                </div>
            </div>
        </div>
    )
}
