import { useState } from "react"
import { List } from "semantic-ui-react"

import { parseToken } from "../Auth"
import { PlayerImage } from "../PlayerImage"

import { Leaderboard, Rank } from "../models/Leaderboard"
import { Player } from "../models/Player"

import "./LeaderboardList.css"

interface LeaderboardListProps {
    leaderboard: Leaderboard
    players: Player[]
}

const getAverage = (r: Rank) => r.pointsScored / r.playedCount

const sortLeaderboard = (r: Rank, s: Rank) => {
    if (s.pointsScored === r.pointsScored) {
        return getAverage(s) - getAverage(r)
    }

    return s.pointsScored - r.pointsScored
}

export const LeaderboardList = (props: LeaderboardListProps) => {
    let sorted = props.leaderboard.leaderboard.sort(sortLeaderboard)

    const token = parseToken()
    const username = token?.username || ""

    return (
        <div className="leaderboard-list">
            <List relaxed divided selection>
                {sorted.map((r, i) => {
                    let player = props.players.find(p => p.username === r.username)
                    let image = player?.profilePicture || ""
                    let name = player?.displayName ?? r.username
                    if (r.username === username) {
                        name += " (you)"
                    }

                    return <LeaderboardCard key={i} index={i + 1} image={image} name={name} rank={r} />
                })}
            </List>
        </div>
    )
}

const LeaderboardCard = (props: {
    index: number
    image: string
    name: string
    rank: Rank
}) => {
    const [open, setOpen] = useState(false)

    // TODO: use an accordion instead

    return (
        <List.Item onClick={() => setOpen(!open)}>
            <List.Header>
                <div>{props.index}</div>
                <PlayerImage imageSrc={props.image} />
                <div className="player-name"><strong>{props.name}</strong></div>
                <div className="player-score">{props.rank.pointsScored} point(s)</div>
            </List.Header>

            {open && <List.Content>
                <div>Played: {props.rank.playedCount}</div>
                <div>Average: {getAverage(props.rank)} point(s)</div>
            </List.Content>}
        </List.Item>
    )
}
