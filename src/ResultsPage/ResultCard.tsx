import { Table } from "semantic-ui-react"
import moment from "moment"

import { GameImage } from "../GameImage"

import { displayDateTimeValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { Group } from "../models/Group"
import { Player } from "../models/Player"
import { Result } from "../models/Result"
import { WinMethodName } from "../models/WinMethod"

interface ResultCardProps {
    result: Result
    games: Game[]
    groups: Group[]
    players: Player[]
}

export const ResultCard = (props: ResultCardProps) => {
    let r = props.result

    let game = props.games.find(g => g.name === r.gameName)

    if (game === undefined) {
        return null
    }

    // players who were in the game
    let bestScore = r.scores.reduce((a, b) => a.score > b.score ? a : b).score

    let playersWithScores = r.scores.map(s => {
        let player = props.players.find(p => p.username === s.username)

        return {
            player: player?.displayName ?? "(unknown player)",
            hasBestScore: s.score === bestScore,
            ...s
        }
    })

    const renderScoresSummary = () => {
        switch (game?.winMethod) {
            case WinMethodName.IndividualScore:
                return playersWithScores.map(s => {
                    let content = <span>{s.player}: {s.score}</span>
                    if (s.hasBestScore) {
                        content = <b>{content}</b>
                    }

                    return <div key={s.username}>{content}</div>
                })

            case WinMethodName.IndividualWin:
                return playersWithScores.map(s => {
                    let content = <span>{s.player} {s.isWinner ? "won" : "lost"}</span>
                    if (s.isWinner) {
                        content = <b>{content}</b>
                    }

                    return <div key={s.username}>{content}</div>
                })

            case WinMethodName.CooperativeScore:
                let scoreStr = playersWithScores.slice(0, -1).map(s => s.player).join(", ")
                scoreStr += ` & ${playersWithScores.at(-1)?.player}: ${r.cooperativeScore}`

                return <div><b><span>{scoreStr}</span></b></div>

            case WinMethodName.CooperativeWin:
                let winStr = playersWithScores.slice(0, -1).map(s => s.player).join(", ")
                winStr += ` & ${playersWithScores.at(-1)?.player} ${r.cooperativeWin ? "won" : "lost"}`

                let content = <span>{winStr}</span>
                if (r.cooperativeWin) {
                    content = <b>{content}</b>
                }

                return <div>{content}</div>
        }

        return null
    }

    let group = props.groups.find(gr => gr.name === r.groupName)

    return (
        <Table.Row>
            <Table.Cell>
                <GameImage imageSrc={game.imageLink} />
            </Table.Cell>

            <Table.Cell>
                <a href={`/games/${game.name}`}>
                    {game.displayName}
                </a>
            </Table.Cell>

            <Table.Cell>
                {renderScoresSummary()}
            </Table.Cell>

            <Table.Cell>
                <a href={`/groups/${r.groupName}`}>
                    {group?.displayName ?? r.groupName}
                </a>
            </Table.Cell>

            <Table.Cell>
                {displayDateTimeValue(moment.unix(r.timePlayed))}
            </Table.Cell>

            <Table.Cell>
                {displayDateTimeValue(moment.unix(r.timeCreated))}
            </Table.Cell>

            <Table.Cell>
                {r.notes}
            </Table.Cell>
        </Table.Row>
    )
}
