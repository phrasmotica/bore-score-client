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
        if (game === undefined) {
            return null
        }

        let scoreStr = ""

        switch (game?.winMethod) {
            case WinMethodName.IndividualScore:
                scoreStr = playersWithScores.map(s => `${s.player}: ${s.score}`).join(", ")
                break

            case WinMethodName.IndividualWinner:
                scoreStr = playersWithScores.map(s => `${s.player} ${s.isWinner ? "won" : "lost"}`).join(", ")
                break

            case WinMethodName.CooperativeScore:
                scoreStr = playersWithScores.slice(0, -1).map(s => s.player).join(", ")
                scoreStr += ` & ${playersWithScores.at(-1)?.player}: ${r.cooperativeScore}`
                break
        }

        return (
            <List.Content>
                <List.Header>
                    <a href={`/games/${game.name}`}>
                        {game.displayName ?? r.gameName}
                    </a>
                </List.Header>
                <List.Description>{displayDateTimeValue(moment.unix(r.timestamp))}</List.Description>
                <List.Description>{scoreStr}</List.Description>
            </List.Content>
        )
    }

    return (
        <List.Item key={r.id}>
            {renderContent()}
        </List.Item>
    )
}
