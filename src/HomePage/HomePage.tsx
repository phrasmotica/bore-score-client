import { Statistic } from "semantic-ui-react"

import { useGames, useResults, useSummary } from "../FetchHelpers"
import { GameImage } from "../GameImage"
import { sortResultsByRecent } from "../models/Result"

export const HomePage = () => {
    const { isLoadingSummary, summary } = useSummary()
    const { games } = useGames()
    const { results } = useResults()

    const renderSummary = () => {
        if (isLoadingSummary) {
            return <h2>Loading...</h2>
        }

        if (summary === undefined) {
            return null
        }

        return (
            <Statistic.Group>
                <Statistic color="green">
                    <Statistic.Value>{summary.gameCount}</Statistic.Value>
                    <Statistic.Label><a href="/games">Games</a></Statistic.Label>
                </Statistic>

                <Statistic color="teal">
                    <Statistic.Value>{summary.playerCount}</Statistic.Value>
                    <Statistic.Label><a href="/players">Players</a></Statistic.Label>
                </Statistic>

                <Statistic color="blue">
                    <Statistic.Value>{summary.resultCount}</Statistic.Value>
                    <Statistic.Label><a href="/results">Results</a></Statistic.Label>
                </Statistic>
            </Statistic.Group>
        )
    }

    const renderGamesOfRecentResults = () => {
        let lastResults = sortResultsByRecent(results)
        let gameNames = [...new Set(lastResults.map(r => r.gameName))].slice(0, 5)
        let gamesToShow = gameNames.map(n => games.find(g => g.name === n)!)

        return (
            <div className="games-carousel">
                {gamesToShow.map(g => (
                    <GameImage
                        key={g.name}
                        link={`/games/${g.name}`}
                        imageSrc={g.imageLink} />
                ))}
            </div>
        )
    }

    return (
        <div className="home-page">
            <h1>Welcome to BoreScore!</h1>

            <h3>You can use this website to record the results of tabletop games that you play with your friends.</h3>

            <div className="home-page-content">
                <h3>Now serving:</h3>

                {renderSummary()}

                <h3>Users are playing:</h3>

                {renderGamesOfRecentResults()}
            </div>
        </div>
    )
}
