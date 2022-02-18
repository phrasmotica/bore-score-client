import { DropdownItemProps, Form } from "semantic-ui-react"

interface PlayerWinnerInputProps {
    label: string
    playerOptions: DropdownItemProps[]
    playerId: number | undefined
    setPlayerId: (id: number) => void
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
                value={props.playerId}
                onChange={(e, { value }) => props.setPlayerId(Number(value))} />

            <Form.Checkbox
                label="Winner"
                checked={props.isWinner}
                onChange={props.setIsWinner} />
        </Form.Group>
    )
}
