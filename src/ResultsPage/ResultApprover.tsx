import { Button } from "semantic-ui-react"

interface ResultApproverProps {
    approve: () => void
    reject: () => void
}

export const ResultApprover = (props: ResultApproverProps) => {
    return (
        <Button.Group vertical>
            <Button fluid color="green" onClick={props.approve}>
                Approve
            </Button>

            <Button fluid color="red" onClick={props.reject}>
                Reject
            </Button>
        </Button.Group>
    )
}
