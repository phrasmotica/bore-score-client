import { List } from "semantic-ui-react"
import moment from "moment"

import { displayDateTimeValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { Player } from "../models/Player"
import { Result } from "../models/Result"
import { WinMethodName } from "../models/WinMethod"

interface ResultCardProps {
    result: Result
    games: Game[]
    players: Player[]
}

export const ResultCard = (props: ResultCardProps) => {
    let r = props.result

    let game = props.games.find(g => g.name === r.gameName)

    // players who were in the game
    let playersWithScores = r.scores.map(s => {
        let player = props.players.find(p => p.username === s.username)

        return {
            player: player?.displayName ?? "(unknown player)",
            score: s.score,
            isWinner: s.isWinner,
        }
    })

    const renderContent = () => {
        switch (game?.winMethod) {
            case WinMethodName.IndividualScore:
                let scoresStr = playersWithScores.map(s => `${s.player}: ${s.score}`).join(", ")

                return (
                    <List.Content>
                        <List.Header>{game?.displayName ?? r.gameName}</List.Header>
                        <List.Description>{displayDateTimeValue(moment.unix(r.timestamp))}</List.Description>
                        <List.Description>{scoresStr}</List.Description>
                    </List.Content>
                )

            case WinMethodName.IndividualWinner:
                let winnerStr = playersWithScores.map(s => `${s.player} ${s.isWinner ? "won" : "lost"}`).join(", ")

                return (
                    <List.Content>
                        <List.Header>{game?.displayName ?? r.gameName}</List.Header>
                        <List.Description>{displayDateTimeValue(moment.unix(r.timestamp))}</List.Description>
                        <List.Description>{winnerStr}</List.Description>
                    </List.Content>
                )

            case WinMethodName.CooperativeScore:
                let playersStr = playersWithScores.slice(0, -1).map(s => s.player).join(", ")
                playersStr += ` & ${playersWithScores.at(-1)?.player}`

                return (
                    <List.Content>
                        <List.Header>{game?.displayName ?? r.gameName}</List.Header>
                        <List.Description>{displayDateTimeValue(moment.unix(r.timestamp))}</List.Description>
                        <List.Description>{playersStr}: {r.cooperativeScore}</List.Description>
                    </List.Content>
                )
        }

        return null
    }

    return (
        <List.Item key={r.id}>
            {renderContent()}
        </List.Item>
    )
}
