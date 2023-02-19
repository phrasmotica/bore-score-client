import { Message } from "semantic-ui-react"

interface PlayerCountWarningProps {
    playerCount: number
    maxPlayerCount: number
}

export const PlayerCountWarning = (props: PlayerCountWarningProps) => (
    <Message warning>
        <Message.Header>
            This game allows up to {props.maxPlayerCount} players but only&nbsp;
            {props.playerCount} players exist, so you may only include up to&nbsp;
            {props.playerCount} players in this result.
        </Message.Header>
    </Message>
)
