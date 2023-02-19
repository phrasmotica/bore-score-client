import { Message } from "semantic-ui-react"

export const AttachedGroupMessage = () => (
    <Message positive className="attached-group-message">
        <Message.Header>
            This result will only be visible to members of the selected group.
        </Message.Header>
    </Message>
)
