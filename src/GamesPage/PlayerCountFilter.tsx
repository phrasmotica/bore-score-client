import { Form } from "semantic-ui-react"

interface PlayerCountFilterProps {
    label: string
    enabled: boolean
    setEnabled: (enabled: boolean) => void
    value: number
    setValue: (count: number) => void
}

export const PlayerCountFilter = (props: PlayerCountFilterProps) => (
    <Form className="player-count-picker-container">
        <Form.Group>
            <Form.Checkbox
                className="player-count-checkbox"
                label={props.label}
                checked={props.enabled}
                onChange={(e, { checked }) => props.setEnabled(checked ?? false)} />

            <Form.Input
                className="player-count-picker"
                type="number"
                min={1}
                value={props.value}
                disabled={!props.enabled}
                onChange={(e, { value }) => props.setValue(Number(value))} />
        </Form.Group>
    </Form>
)
