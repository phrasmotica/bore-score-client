import { useMemo, useState } from "react"
import { Slider } from "react-semantic-ui-range"
import { Button, Icon } from "semantic-ui-react"

import { GamesList } from "./GamesList"
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
    const [minPlayers, setMinPlayers] = useState(lowestMinPlayers)
    const [maxPlayers, setMaxPlayers] = useState(highestMaxPlayers)

    let filters = new FilterSet<Game>()
        .with("winMethod", new Filter(selectedWinMethods.length > 0, g => selectedWinMethods.includes(g.winMethod)))
        .with("numPlayers", new Filter(true, g => g.minPlayers >= minPlayers && g.maxPlayers <= maxPlayers))

    let filteredGames = filters.apply(allGames)

    let sliderSettings = {
        start: [lowestMinPlayers, highestMaxPlayers],
        min: lowestMinPlayers,
        max: highestMaxPlayers,
        step: 1,
        onChange: (values: number[]) => {
            setMinPlayers(values[0])
            setMaxPlayers(values[1])
        }
    }

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
                        games={filters.except("winMethod").apply(allGames)}
                        selectedWinMethods={selectedWinMethods}
                        setSelectedWinMethods={setSelectedWinMethods} />

                    {/* TODO: improve the slider */}
                    <div className="slider">
                        <Slider
                            discrete
                            multiple
                            value={[minPlayers, maxPlayers]}
                            settings={sliderSettings} />
                    </div>

                    <div style={{textAlign: "center"}}>
                        {minPlayers}&nbsp;&le;&nbsp;Players&nbsp;&le;&nbsp;{maxPlayers}
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
