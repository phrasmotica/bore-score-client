import { Link } from "react-router-dom"
import { ScoreCardProps, createIcon } from "./ScoreCardProps"

export const IndividualScoreCard = (props: ScoreCardProps) => (
    <div>
        {props.players.map(s => {
            let content = (
                <span>
                    {createIcon(s.approvalStatus)}
                    <Link to={`/players/${s.username}`}>
                        {s.displayName}
                    </Link>
                    : {s.score}
                </span>
            )

            if (s.hasBestScore) {
                content = <b>{content}</b>
            }

            return <div key={s.username}>{content}</div>
        })}
    </div>
)
