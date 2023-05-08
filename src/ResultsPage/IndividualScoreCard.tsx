import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

import { ScoreCardProps, createIcon } from "./ScoreCardProps"

export const IndividualScoreCard = (props: ScoreCardProps) => (
    <List divided>
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
                <div className="score">
                    <span>
                        {createIcon(s.approvalStatus)}
                        {nameElement}
                    </span>

                    <span className="value">
                        {s.score}
                    </span>
                </div>
            )

            if (s.hasBestScore) {
                content = <b>{content}</b>
            }

            return <List.Item key={key}>{content}</List.Item>
        })}
    </List>
)
