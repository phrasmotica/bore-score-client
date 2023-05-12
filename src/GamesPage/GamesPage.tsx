import { useMemo, useState } from "react"
import { Button, Icon } from "semantic-ui-react"

import { GamesList } from "./GamesList"
import { PlayerCountFilter } from "./PlayerCountFilter"
import { WinMethodFilterDropdown } from "./WinMethodFilterDropdown"

import { AddGameModal } from "../AddGameModal/AddGameModal"

import { parseToken } from "../Auth"
import { Filter, FilterSet } from "../Filters"
import { useTitle } from "../Hooks"
import { useGames, useWinMethods } from "../QueryHelpers"

import { Game } from "../models/Game"

import "./GamesPage.css"

export const GamesPage = () => {
    useTitle("Games")

    const { data: games } = useGames()
    const { data: winMethods } = useWinMethods()

    let allGames = useMemo(() => games ?? [], [games])

    let lowestMinPlayers = useMemo(() => {
        if (allGames.length <= 0) {
            return 2
        }

        return allGames.reduce((a, b) => a.minPlayers < b.minPlayers ? a : b).minPlayers
    }, [allGames])

    let highestMaxPlayers = useMemo(() => {
        if (allGames.length <= 0) {
            return 4
        }

        return allGames.reduce((a, b) => a.maxPlayers > b.maxPlayers ? a : b).maxPlayers
    }, [allGames])

    const token = parseToken()

    const [showAddGameModal, setShowAddGameModal] = useState(false)

    const [selectedWinMethods, setSelectedWinMethods] = useState<string[]>([])

    const [filterByMinPlayers, setFilterByMinPlayers] = useState(false)
    const [minPlayers, setMinPlayers] = useState(lowestMinPlayers)

    const [filterByMaxPlayers, setFilterByMaxPlayers] = useState(false)
    const [maxPlayers, setMaxPlayers] = useState(highestMaxPlayers)

    let filters = new FilterSet<Game>()
        .with(new Filter(selectedWinMethods.length > 0, g => selectedWinMethods.includes(g.winMethod)))
        .with(new Filter(filterByMinPlayers, g => g.minPlayers >= minPlayers))
        .with(new Filter(filterByMaxPlayers, g => g.maxPlayers <= maxPlayers))

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
                        setValue={v => setMinPlayers(Math.min(Math.max(v, lowestMinPlayers), maxPlayers))} />

                    <PlayerCountFilter
                        label="Maximum players"
                        enabled={filterByMaxPlayers}
                        setEnabled={setFilterByMaxPlayers}
                        value={maxPlayers}
                        setValue={v => setMaxPlayers(Math.max(Math.min(v, highestMaxPlayers), minPlayers))} />
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
