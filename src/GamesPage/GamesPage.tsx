import { useMemo, useState } from "react"
import { Button, Icon, Input } from "semantic-ui-react"

import { GamesList } from "./GamesList"
import { WinMethodFilterDropdown } from "./WinMethodFilterDropdown"

import { AddGameModal } from "../AddGameModal/AddGameModal"
import { TooltipSlider } from "../TooltipSlider"

import { parseToken } from "../Auth"
import { Filter, FilterSet, Predicate } from "../Filters"
import { getMatches } from "../Fuzzy"
import { useTitle } from "../Hooks"
import { useGames, useWinMethods } from "../QueryHelpers"

import { Game } from "../models/Game"

import "rc-slider/assets/index.css"
import "./GamesPage.css"

export const GamesPage = () => {
    useTitle("Games")

    const { data: games, isLoading: isLoadingGames } = useGames()
    const { data: winMethods } = useWinMethods()

    let allGames = useMemo(() => games ?? [], [games])

    let lowestMinPlayers = useMemo(() => {
        return allGames.map(g => g.minPlayers).reduce((a, b) => Math.min(a, b), 1)
    }, [allGames])

    let highestMaxPlayers = useMemo(() => {
        return allGames.map(g => g.maxPlayers).reduce((a, b) => Math.max(a, b), 6)
    }, [allGames])

    const token = parseToken()

    const [showAddGameModal, setShowAddGameModal] = useState(false)

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedWinMethods, setSelectedWinMethods] = useState<string[]>([])
    const [playerRange, setPlayerRange] = useState([lowestMinPlayers, highestMaxPlayers])

    let filters = new FilterSet<Game>()
        .with("searchTerm", new Filter(searchTerm.length > 0, games => getMatches(searchTerm, games, "displayName")))
        .with("winMethod", new Predicate(selectedWinMethods.length > 0, g => selectedWinMethods.includes(g.winMethod)))
        .with("playerRange", new Predicate(!isLoadingGames, g => g.maxPlayers >= playerRange[0] && g.minPlayers <= playerRange[1]))

    let filteredGames = filters.apply(allGames)

    return (
        <div className="games-page">
            <AddGameModal open={showAddGameModal} setOpen={setShowAddGameModal} />

            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">
                    <Input
                        fluid
                        icon="search"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e, { value }) => setSearchTerm(value)} />

                    <WinMethodFilterDropdown
                        winMethods={winMethods ?? []}
                        games={filters.except("winMethod").apply(allGames)}
                        selectedWinMethods={selectedWinMethods}
                        setSelectedWinMethods={setSelectedWinMethods} />

                    <div className="slider">
                        <p>Players</p>

                        <TooltipSlider
                            range
                            dots
                            allowCross={false}
                            min={lowestMinPlayers}
                            max={highestMaxPlayers}
                            value={playerRange}
                            onChange={v => setPlayerRange(v as number[])}
                            tipProps={{visible: true}} />
                    </div>
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
