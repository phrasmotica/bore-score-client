import { Button, Icon } from "semantic-ui-react"

interface ResultApproverProps {
    approveEnabled: boolean
    approve: () => void
    rejectEnabled: boolean
    reject: () => void
}

export const ResultApprover = (props: ResultApproverProps) => {
    return (
        <Button.Group>
            <Button icon disabled={!props.approveEnabled} color="green" onClick={props.approve}>
                <Icon name="check circle outline" />
            </Button>

            <Button icon disabled={!props.rejectEnabled} color="red" onClick={props.reject}>
                <Icon name="times circle outline" />
            </Button>
        </Button.Group>
    )
}
