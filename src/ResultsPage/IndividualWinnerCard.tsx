import { Link } from "react-router-dom"
import { ScoreCardProps } from "./ScoreCardProps"

export const IndividualWinnerCard = (props: ScoreCardProps) => (
    <div>
        {props.players.map(s => {
            let content = (
                <span>
                    <Link to={`/players/${s.username}`}>
                        {s.displayName}
                    </Link>
                    &nbsp;{s.isWinner ? "won" : "lost"}
                </span>
            )

            if (s.isWinner) {
                content = <b>{content}</b>
            }

            return <div key={s.username}>{content}</div>
        })}
    </div>
)
