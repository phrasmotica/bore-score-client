import { DropdownItemProps, Form } from "semantic-ui-react"

interface PlayerScoreInputProps {
    label: string
    playerOptions: DropdownItemProps[]
    player: string
    setPlayer: (username: string) => void
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
                value={props.player}
                onChange={(e, { value }) => props.setPlayer(String(value))} />

            <Form.Input
                label="Score"
                type="number"
                value={props.score}
                min={0}
                onChange={(e, { value }) => props.setScore(Number(value))} />
        </Form.Group>
    )
}
