import { Link } from "react-router-dom"
import { ScoreCardProps, createIcon } from "./ScoreCardProps"

interface CooperativeWinCardProps {
    isWin: boolean
}

export const CooperativeWinCard = (props: ScoreCardProps & CooperativeWinCardProps) => {
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
            &nbsp;{props.isWin ? "won" : "lost"}
        </span>
    )

    if (props.isWin) {
        content = <b>{content}</b>
    }

    return <div>{content}</div>
}
