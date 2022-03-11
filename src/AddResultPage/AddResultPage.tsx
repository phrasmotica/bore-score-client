import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"
import moment from "moment"

import { CommonForm } from "./CommonForm"
import { CooperativeScoreForm } from "./CooperativeScoreForm"
import { CooperativeWinForm } from "./CooperativeWinForm"
import { IndividualScoreForm } from "./IndividualScoreForm"
import { IndividualWinForm } from "./IndividualWinForm"
import { GameImage } from "../GameImage"

import { useGames, useGroups, usePlayers } from "../FetchHelpers"
import { submitValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { WinMethodName } from "../models/WinMethod"

export const AddResultPage = () => {
    const [searchParams] = useSearchParams()

    const { games } = useGames()
    const { groups } = useGroups()
    const { players } = usePlayers()

    const [game, setGame] = useState<Game>()
    const [useGroup, setUseGroup] = useState(false)
    const [group, setGroup] = useState("")
    const [timestamp, setTimestamp] = useState(moment())
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
            setGroup(groups[0].name)
        }
    }, [groups])

    const navigate = useNavigate()

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

    const submit = () => {
        if (game === undefined) {
            return
        }

        fetch("http://localhost:8000/results", {
            method: "POST",
            body: JSON.stringify({
                gameName: game.name,
                groupName: useGroup ? group : "",
                timestamp: submitValue(timestamp),
                notes: notes,
                ...formData
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => navigate("/results"))
    }

    let imageSrc = game?.imageLink || "https://e.snmc.io/i/600/s/9f6d3d17acac6ce20993eb158c203e4b/5662600/godspeed-you-black-emperor-lift-yr-skinny-fists-like-antennas-to-heaven-cover-art.jpg"

    return (
        <div className="add-result-page">
            <h2>Add Result</h2>

            <div className="add-result-page-body">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />
                </div>

                <div className="middle">
                    <CommonForm
                        games={games}
                        groups={groups}
                        selectedGame={game}
                        setSelectedGame={setGame}
                        useGroup={useGroup}
                        setUseGroup={setUseGroup}
                        group={group}
                        setGroup={setGroup}
                        timestamp={timestamp}
                        setTimestamp={setTimestamp}
                        notes={notes}
                        setNotes={setNotes}
                        formIsComplete={formIsComplete}
                        submit={submit} />
                </div>

                <div className="right">
                    {renderGameForm()}
                </div>
            </div>
        </div>
    )
}
