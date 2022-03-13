import { ScoreCardProps } from "./ScoreCardProps"

export const IndividualScoreCard = (props: ScoreCardProps) => (
    <div>
        {props.players.map(s => {
            let content = (
                <span>
                    <a href={`/players/${s.username}`}>
                        {s.displayName}
                    </a>
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
