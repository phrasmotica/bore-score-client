import { Button, Icon } from "semantic-ui-react"

interface RemovePlayerButtonProps {
    removePlayer: () => void
    isDisabled: boolean
}

export const RemovePlayerButton = (props: RemovePlayerButtonProps) => (
    <Button
        icon
        inverted
        color="red"
        onClick={props.removePlayer}
        disabled={props.isDisabled}>
        <Icon name="trash" />
    </Button>
)
