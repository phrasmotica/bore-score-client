import { List } from "semantic-ui-react"
import moment from "moment"

import { displayDateTimeValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { Player } from "../models/Player"
import { Result } from "../models/Result"

interface ResultCardProps {
    result: Result
    games: Game[]
    players: Player[]
}

export const ResultCard = (props: ResultCardProps) => {
    let r = props.result

    let game = props.games.find(g => g.id === r.gameId)

    // players who were in the game
    let playersWithScores = r.scores.map(s => {
        let player = props.players.find(p => p.id === s.playerId)

        return {
            player: player?.displayName ?? `Player ${s.playerId}`,
            score: s.score,
        }
    })

    let scoresStr = playersWithScores.map(s => `${s.player}: ${s.score}`).join(", ")

    return (
        <List.Item key={r.id}>
            <List.Content>
                <List.Header>{game?.name ?? `<Game ${r.gameId}>`}</List.Header>
                <List.Description>{displayDateTimeValue(moment.unix(r.timestamp))}</List.Description>
                <List.Description>{scoresStr}</List.Description>
            </List.Content>
        </List.Item>
    )
}
