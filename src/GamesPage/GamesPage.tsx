import { useState } from "react"

import { GamesTable } from "./GamesTable"
import { WinMethodFilterDropdown } from "./WinMethodFilterDropdown"

import { useGames, useWinMethods } from "../FetchHelpers"

export const GamesPage = () => {
    const { games } = useGames()
    const { winMethods } = useWinMethods()

    const [selectedWinMethods, setSelectedWinMethods] = useState<string[]>([])

    return (
        <div className="games-page">
            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <WinMethodFilterDropdown
                    winMethods={winMethods}
                    games={games}
                    selectedWinMethods={selectedWinMethods}
                    setSelectedWinMethods={setSelectedWinMethods} />
            </div>

            <div className="games-page-body">
                <h2>Games</h2>

                <GamesTable
                    games={games}
                    winMethods={winMethods}
                    selectedWinMethods={selectedWinMethods} />
            </div>
        </div>
    )
}
