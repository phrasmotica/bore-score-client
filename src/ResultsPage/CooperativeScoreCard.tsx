import { ScoreCardProps } from "./ScoreCardProps"

interface CooperativeScoreCardProps {
    score: number
}

export const CooperativeScoreCard = (props: ScoreCardProps & CooperativeScoreCardProps) => {
    let playerLinks = props.players.map((s, i) => (
        <a key={i} href={`/players/${s.username}`}>
            {s.displayName}
        </a>
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
