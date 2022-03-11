import { GamesTable } from "./GamesTable"

import { useGames, useWinMethods } from "../FetchHelpers"

export const GamesPage = () => {
    const { games } = useGames()
    const { winMethods } = useWinMethods()

    return (
        <div className="games-page">
            <h2>Games</h2>

            <GamesTable games={games} winMethods={winMethods} />
        </div>
    )
}
