import { Message } from "semantic-ui-react"

export const NoAttachedGroupWarning = () => (
    <Message warning className="no-attached-group-warning">
        <Message.Header>
            This result will be visible to everyone.
        </Message.Header>
    </Message>
)
