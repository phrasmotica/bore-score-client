import { DropdownItemProps, Form } from "semantic-ui-react"

interface PlayerScoreInputProps {
    label: string
    playerOptions: DropdownItemProps[]
    playerId: number | undefined
    setPlayerId: (id: number) => void
    score: number
    setScore: (score: number) => void
}

export const PlayerScoreInput = (props: PlayerScoreInputProps) => {
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

            <Form.Input
                label="Score"
                type="number"
                value={props.score}
                min={0}
                onChange={(e, { value }) => props.setScore(Number(value))} />
        </Form.Group>
    )
}
