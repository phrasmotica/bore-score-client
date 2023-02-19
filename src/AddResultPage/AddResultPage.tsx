import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"
import moment from "moment"
import { Form } from "semantic-ui-react"

import { GroupForm } from "../AddResultModal/GroupForm"
import { CooperativeScoreForm } from "../AddResultModal/CooperativeScoreForm"
import { CooperativeWinForm } from "../AddResultModal/CooperativeWinForm"
import { IndividualScoreForm } from "../AddResultModal/IndividualScoreForm"
import { IndividualWinForm } from "../AddResultModal/IndividualWinForm"
import { GameImage } from "../GameImage"

import { useGames, useGroups, usePlayers } from "../FetchHelpers"
import { useTitle } from "../Hooks"

import { Game } from "../models/Game"
import { WinMethodName } from "../models/WinMethod"
import { DateTimeForm } from "../AddResultModal/DateTimeForm"

export const AddResultPage = () => {
    useTitle("Add Result")

    const [searchParams] = useSearchParams()

    const { games } = useGames()
    const { groups } = useGroups()
    const { players } = usePlayers()

    const [game, setGame] = useState<Game>()
    const [useGroup, setUseGroup] = useState(false)
    const [group, setGroup] = useState("")
    const [timePlayed, setTimePlayed] = useState(moment())
    const [notes, setNotes] = useState("")

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

    const renderGameForm = () => {
        switch (game?.winMethod) {
            case WinMethodName.IndividualScore:
                return (
                    <IndividualScoreForm
                        players={players}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.IndividualWin:
                return (
                    <IndividualWinForm
                        players={players}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.CooperativeScore:
                return (
                    <CooperativeScoreForm
                        players={players}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.CooperativeWin:
                return (
                    <CooperativeWinForm
                        players={players}
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

    return (
        <div className="add-result-page">
            <h2>Add Result</h2>

            <div className="add-result-page-body">
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

                    {renderGameForm()}
                </div>

                <div className="right">
                    <DateTimeForm
                        timePlayed={timePlayed}
                        setTimePlayed={setTimePlayed} />

                    <GroupForm
                        groups={groups}
                        useGroup={useGroup}
                        setUseGroup={setUseGroup}
                        group={group}
                        setGroup={setGroup} />
                </div>
            </div>
        </div>
    )
}
