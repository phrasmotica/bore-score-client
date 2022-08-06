import { Link } from "react-router-dom"
import { ScoreCardProps } from "./ScoreCardProps"

export const IndividualScoreCard = (props: ScoreCardProps) => (
    <div>
        {props.players.map(s => {
            let content = (
                <span>
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
