import { Link } from "react-router-dom"
import { Statistic } from "semantic-ui-react"

import { getResults, useGames, useSummary } from "../FetchHelpers"
import { GameImage } from "../GameImage"
import { useTitle } from "../Hooks"

import { sortResultsByRecent } from "../models/Result"
import { useQuery } from "@tanstack/react-query"

export const HomePage = () => {
    useTitle("Home")

    // TODO: add error handling
    const { data: results } = useQuery({
        queryKey: ["results"],
        queryFn: () => getResults(),
    })

    const { isLoadingSummary, summary } = useSummary()
    const { games } = useGames()

    const renderSummary = () => {
        if (isLoadingSummary) {
            return <h2>Loading...</h2>
        }

        if (summary === undefined) {
            return null
        }

        return (
            <Statistic.Group>
                <Statistic color="olive">
                    <Statistic.Value>{summary.gameCount}</Statistic.Value>
                    <Statistic.Label><Link to="/games">Games</Link></Statistic.Label>
                </Statistic>

                <Statistic color="green">
                    <Statistic.Value>{summary.groupCount}</Statistic.Value>
                    <Statistic.Label><Link to="/groups">Groups</Link></Statistic.Label>
                </Statistic>

                <Statistic color="teal">
                    <Statistic.Value>{summary.playerCount}</Statistic.Value>
                    <Statistic.Label>Players</Statistic.Label>
                </Statistic>

                <Statistic color="blue">
                    <Statistic.Value>{summary.resultCount}</Statistic.Value>
                    <Statistic.Label><Link to="/results">Results</Link></Statistic.Label>
                </Statistic>
            </Statistic.Group>
        )
    }

    const renderGamesOfRecentResults = () => {
        if (games.length <= 0) {
            return null
        }

        let lastResults = sortResultsByRecent(results ?? [])
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
