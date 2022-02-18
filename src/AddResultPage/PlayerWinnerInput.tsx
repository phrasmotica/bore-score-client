import { DropdownItemProps, Form } from "semantic-ui-react"

interface PlayerWinnerInputProps {
    label: string
    playerOptions: DropdownItemProps[]
    player: string
    setPlayer: (username: string) => void
    isWinner: boolean
    setIsWinner: () => void
}

export const PlayerWinnerInput = (props: PlayerWinnerInputProps) => {
    return (
        <Form.Group widths="equal">
            <Form.Dropdown
                search
                selection
                label={props.label}
                placeholder={props.label}
                options={props.playerOptions}
                value={props.player}
                onChange={(e, { value }) => props.setPlayer(String(value))} />

            <Form.Checkbox
                label="Winner"
                checked={props.isWinner}
                onChange={props.setIsWinner} />
        </Form.Group>
    )
}
