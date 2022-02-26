import { Button } from "semantic-ui-react"

interface RemovePlayerButtonProps {
    removePlayer: () => void
    isDisabled: boolean
}

export const RemovePlayerButton = (props: RemovePlayerButtonProps) => (
    <Button
        fluid
        inverted
        color="red"
        onClick={props.removePlayer}
        disabled={props.isDisabled}>
        Remove player
    </Button>
)
