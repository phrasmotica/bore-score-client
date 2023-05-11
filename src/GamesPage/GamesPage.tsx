import { useState } from "react"
import { Button, Icon } from "semantic-ui-react"

import { GamesList } from "./GamesList"
import { PlayerCountFilter } from "./PlayerCountFilter"
import { WinMethodFilterDropdown } from "./WinMethodFilterDropdown"

import { AddGameModal } from "../AddGameModal/AddGameModal"

import { parseToken } from "../Auth"
import { FilterSet } from "../Filters"
import { useTitle } from "../Hooks"
import { useGames, useWinMethods } from "../QueryHelpers"

import { Game } from "../models/Game"

import "./GamesPage.css"

export const GamesPage = () => {
    useTitle("Games")

    const { data: games } = useGames()
    const { data: winMethods } = useWinMethods()

    const token = parseToken()

    const [showAddGameModal, setShowAddGameModal] = useState(false)

    const [selectedWinMethods, setSelectedWinMethods] = useState<string[]>([])

    const [filterByMinPlayers, setFilterByMinPlayers] = useState(false)
    const [minPlayers, setMinPlayers] = useState(1)

    const [filterByMaxPlayers, setFilterByMaxPlayers] = useState(false)
    const [maxPlayers, setMaxPlayers] = useState(2)

    let filters = new FilterSet<Game>([
        {
            condition: selectedWinMethods.length > 0,
            func: g => selectedWinMethods.includes(g.winMethod),
        },
        {
            condition: filterByMinPlayers,
            func: g => g.minPlayers >= minPlayers,
        },
        {
            condition: filterByMaxPlayers,
            func: g => g.maxPlayers <= maxPlayers,
        },
    ])

    let allGames = games ?? []
    let filteredGames = filters.apply(allGames)

    return (
        <div className="games-page">
            <AddGameModal open={showAddGameModal} setOpen={setShowAddGameModal} />

            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">
                    <WinMethodFilterDropdown
                        winMethods={winMethods ?? []}
                        games={filters.except(0).apply(allGames)}
                        selectedWinMethods={selectedWinMethods}
                        setSelectedWinMethods={setSelectedWinMethods} />

                    <PlayerCountFilter
                        label="Minimum players"
                        enabled={filterByMinPlayers}
                        setEnabled={setFilterByMinPlayers}
                        value={minPlayers}
                        setValue={v => setMinPlayers(Math.min(v, maxPlayers))} />

                    <PlayerCountFilter
                        label="Maximum players"
                        enabled={filterByMaxPlayers}
                        setEnabled={setFilterByMaxPlayers}
                        value={maxPlayers}
                        setValue={v => setMaxPlayers(Math.max(v, minPlayers))} />
                </div>
            </div>

            <div className="games-page-body">
                <div className="header">
                    <h2>Games</h2>

                    {token && <Button
                        icon
                        color="yellow"
                        onClick={() => setShowAddGameModal(true)}>
                        <span>Add New Game&nbsp;</span>
                        <Icon name="plus" />
                    </Button>}
                </div>

                <GamesList games={filteredGames} />
            </div>
        </div>
    )
}
