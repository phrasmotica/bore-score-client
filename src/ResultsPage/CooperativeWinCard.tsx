import { Link } from "react-router-dom"
import { ScoreCardProps } from "./ScoreCardProps"

interface CooperativeWinCardProps {
    isWin: boolean
}

export const CooperativeWinCard = (props: ScoreCardProps & CooperativeWinCardProps) => {
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
            &nbsp;{props.isWin ? "won" : "lost"}
        </span>
    )

    if (props.isWin) {
        content = <b>{content}</b>
    }

    return <div>{content}</div>
}
