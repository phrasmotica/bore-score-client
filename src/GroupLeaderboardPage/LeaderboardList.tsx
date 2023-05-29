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

export const LeaderboardList = (props: LeaderboardListProps) => {
    let sorted = props.leaderboard.leaderboard.sort((r, s) => s.pointsScored - r.pointsScored)

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
}) => (
    <List.Item>
        <div>{props.index}</div>
        <PlayerImage imageSrc={props.image} />
        <div className="player-name"><strong>{props.name}</strong></div>
        <div>{props.rank.pointsScored} point(s)</div>
    </List.Item>
)
