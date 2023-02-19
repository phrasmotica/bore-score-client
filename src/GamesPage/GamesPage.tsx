import { useState } from "react"

import { GamesTable } from "./GamesTable"
import { PlayerCountFilter } from "./PlayerCountFilter"
import { WinMethodFilterDropdown } from "./WinMethodFilterDropdown"

import { useGames, useWinMethods } from "../FetchHelpers"
import { useTitle } from "../Hooks"

import "./GamesPage.css"

export const GamesPage = () => {
    useTitle("Games")

    const { games } = useGames()
    const { winMethods } = useWinMethods()

    const [selectedWinMethods, setSelectedWinMethods] = useState<string[]>([])

    const [filterByMinPlayers, setFilterByMinPlayers] = useState(false)
    const [minPlayers, setMinPlayers] = useState(1)

    const [filterByMaxPlayers, setFilterByMaxPlayers] = useState(false)
    const [maxPlayers, setMaxPlayers] = useState(2)

    return (
        <div className="games-page">
            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">
                    <WinMethodFilterDropdown
                        winMethods={winMethods}
                        games={games}
                        selectedWinMethods={selectedWinMethods}
                        setSelectedWinMethods={setSelectedWinMethods} />

                    <PlayerCountFilter
                        label="Minimum players"
                        enabled={filterByMinPlayers}
                        setEnabled={setFilterByMinPlayers}
                        value={minPlayers}
                        setValue={setMinPlayers} />

                    <PlayerCountFilter
                        label="Maximum players"
                        enabled={filterByMaxPlayers}
                        setEnabled={setFilterByMaxPlayers}
                        value={maxPlayers}
                        setValue={setMaxPlayers} />
                </div>
            </div>

            <div className="games-page-body">
                <div className="header">
                    <h2>Games</h2>
                </div>

                <GamesTable
                    games={games}
                    winMethods={winMethods}
                    selectedWinMethods={selectedWinMethods}
                    useMinPlayers={filterByMinPlayers}
                    minPlayers={minPlayers}
                    useMaxPlayers={filterByMaxPlayers}
                    maxPlayers={maxPlayers} />
            </div>
        </div>
    )
}
