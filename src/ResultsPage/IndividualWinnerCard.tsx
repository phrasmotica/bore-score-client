import { Link } from "react-router-dom"
import { ScoreCardProps, createIcon } from "./ScoreCardProps"

export const IndividualWinnerCard = (props: ScoreCardProps) => (
    <div>
        {props.players.map(s => {
            let content = (
                <span>
                    {createIcon(s.approvalStatus)}
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
