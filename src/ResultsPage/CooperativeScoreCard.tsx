import { Link } from "react-router-dom"
import { ScoreCardProps, createIcon } from "./ScoreCardProps"

interface CooperativeScoreCardProps {
    score: number
}

export const CooperativeScoreCard = (props: ScoreCardProps & CooperativeScoreCardProps) => {
    let playerLinks = props.players.map((s, i) => {
        let nameElement = <span>(unknown player)</span>
        let key = i.toString()

        if (s.displayName) {
            nameElement = (
                <Link to={`/players/${s.username}`}>
                    {s.displayName}
                </Link>
            )

            key = s.username
        }

        return (
            <span key={key}>
                {createIcon(s.approvalStatus)}
                {nameElement}
            </span>
        )
    })

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
