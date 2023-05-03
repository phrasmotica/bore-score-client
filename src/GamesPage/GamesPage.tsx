import { useState } from "react"

import { GamesTable } from "./GamesTable"
import { PlayerCountFilter } from "./PlayerCountFilter"
import { WinMethodFilterDropdown } from "./WinMethodFilterDropdown"

import { AddGameModal } from "../AddGameModal/AddGameModal"

import { parseToken } from "../Auth"
import { useTitle } from "../Hooks"
import { useGames, useWinMethods } from "../QueryHelpers"

import "./GamesPage.css"
import { Button, Icon } from "semantic-ui-react"

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
                        games={games ?? []}
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

                    {token && <Button
                        icon
                        color="yellow"
                        onClick={() => setShowAddGameModal(true)}>
                        <span>Add New Game&nbsp;</span>
                        <Icon name="plus" />
                    </Button>}
                </div>

                <GamesTable
                    games={games ?? []}
                    winMethods={winMethods ?? []}
                    selectedWinMethods={selectedWinMethods}
                    useMinPlayers={filterByMinPlayers}
                    minPlayers={minPlayers}
                    useMaxPlayers={filterByMaxPlayers}
                    maxPlayers={maxPlayers} />
            </div>
        </div>
    )
}
