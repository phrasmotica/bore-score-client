import { Link } from "react-router-dom"
import { ScoreCardProps } from "./ScoreCardProps"

interface CooperativeScoreCardProps {
    score: number
}

export const CooperativeScoreCard = (props: ScoreCardProps & CooperativeScoreCardProps) => {
    let playerLinks = props.players.map((s, i) => (
        <Link key={i} to={`/players/${s.username}`}>
            {s.displayName}
        </Link>
    ))

    let content = (
        <span>
            {playerLinks.map((s, i) => [
                i > 0 && i < playerLinks.length - 1 && ", ",
                i === playerLinks.length - 1 && " & ",
                s
            ])}
            : {props.score}
        </span>
    )

    return <div><b>{content}</b></div>
}
