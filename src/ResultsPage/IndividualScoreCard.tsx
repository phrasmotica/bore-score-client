import { Link } from "react-router-dom"
import { ScoreCardProps, createIcon } from "./ScoreCardProps"

export const IndividualScoreCard = (props: ScoreCardProps) => (
    <div>
        {props.players.map((s, i) => {
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

            let content = (
                <span>
                    {createIcon(s.approvalStatus)}
                    {nameElement}
                    : {s.score}
                </span>
            )

            if (s.hasBestScore) {
                content = <b>{content}</b>
            }

            return <div key={key}>{content}</div>
        })}
    </div>
)
