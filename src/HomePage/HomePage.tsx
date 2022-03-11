import { Statistic } from "semantic-ui-react"

import { useSummary } from "../FetchHelpers"

export const HomePage = () => {
    const { isLoadingSummary, summary } = useSummary()

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

    return (
        <div className="home-page">
            <h1>Welcome to BoreScore!</h1>

            <h3>You can use this website to record the results of tabletop games that you play with your friends.</h3>

            <div className="home-page-content">
                <h3>Now serving:</h3>

                {renderSummary()}
            </div>
        </div>
    )
}
