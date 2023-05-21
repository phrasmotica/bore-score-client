import { List } from "semantic-ui-react"

import { Group } from "../models/Group"
import { GroupInvitation } from "../models/GroupMembership"

import { InvitationCard } from "./InvitationCard"

interface InvitationsListProps {
    invitations: GroupInvitation[]
    groups: Group[]
}

export const InvitationsList = (props: InvitationsListProps) => {
    const renderNoInvitationsMessage = () => (
        <List.Item>
            <p className="no-invitations-message">No invitations to show.</p>
        </List.Item>
    )

    return (
        <div className="invitations-list">
            <List>
                {props.invitations.length <= 0 && renderNoInvitationsMessage()}
                {props.invitations.length > 0 && props.invitations.map(i => (
                    <InvitationCard
                        key={i.id}
                        invitation={i}
                        groups={props.groups} />
                ))}
            </List>
        </div>
    )
}
