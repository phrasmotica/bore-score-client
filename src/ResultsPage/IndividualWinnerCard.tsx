import { ScoreCardProps } from "./ScoreCardProps"

export const IndividualWinnerCard = (props: ScoreCardProps) => (
    <div>
        {props.players.map(s => {
            let content = (
                <span>
                    <a href={`/players/${s.username}`}>
                        {s.displayName}
                    </a>
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
