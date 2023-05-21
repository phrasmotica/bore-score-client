import { useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { Button, ButtonGroup, Icon, Label } from "semantic-ui-react"
import moment from "moment"
import { v4 as newGuid } from "uuid"

import { GameImage } from "../GameImage"

import { parseToken } from "../Auth"
import { useAcceptGroupInvitation, useAddGroupMembership, useDeclineGroupInvitation } from "../Mutations"
import { useGroupInvitations, useGroupMemberships } from "../QueryHelpers"

import { Group, GroupVisibilityName } from "../models/Group"
import { InvitationStatus } from "../models/GroupMembership"

interface GroupCardProps {
    group: Group
    addResult: (name: string) => void
}

export const GroupCard = (props: GroupCardProps) => {
    const queryClient = useQueryClient()

    const token = parseToken()
    const username = token?.username || ""

    const group = props.group

    const { data: invitations } = useGroupInvitations(username)
    const { data: memberships } = useGroupMemberships(username)

    const { mutate: addGroupMembership } = useAddGroupMembership(queryClient, group, username)
    const { mutate: acceptGroupInvitation } = useAcceptGroupInvitation(queryClient, props.group, username)
    const { mutate: declineGroupInvitation } = useDeclineGroupInvitation(queryClient, props.group)

    const isInGroup = memberships && memberships.some(m => m.groupId === group.id)

    const invitation = (invitations ?? []).find(i => i.groupId === props.group.id && i.invitationStatus === InvitationStatus.Sent)
    const isInvitedToGroup = !isInGroup && invitation !== undefined

    const canJoinGroup = username.length > 0 && !isInGroup && group.visibility === GroupVisibilityName.Public

    const joinGroup = () => addGroupMembership({
        id: newGuid(),
        timeCreated: moment().unix(),
        groupId: group.id,
        username: username,
        inviterUsername: "",
    })

    const acceptInvitation = () => {
        if (invitation) {
            acceptGroupInvitation(invitation.id)
        }
    }

    const declineInvitation = () => {
        if (invitation) {
            declineGroupInvitation(invitation.id)
        }
    }

    const renderVisibilityLabel = (group: Group) => {
        const colour = group.visibility === GroupVisibilityName.Private ? "purple" : "green"

        return (
            <Label className="group-visibility-label" color={colour}>
                {group.visibility}
            </Label>
        )
    }

    return (
        <div key={group.id} className="group-card">
            <div className="left">
                <GameImage imageSrc={group.profilePicture} />

                <div className="group-text">
                    <div className="group-header">
                        <Link to={`/groups/${group.id}`}>
                            <h3>{group.displayName}</h3>
                        </Link>

                        <div className="labels">
                            {renderVisibilityLabel(group)}
                        </div>
                    </div>

                    <div className="group-content">
                        <em>{group.description || "N/A"}</em>
                    </div>
                </div>
            </div>

            {token && <div className="right">
                {canJoinGroup && <Button
                    icon
                    fluid
                    color="yellow"
                    onClick={joinGroup}>
                    <span>Join Group&nbsp;</span>
                    <Icon name="users" />
                </Button>}

                {isInvitedToGroup && <ButtonGroup vertical>
                    <Button
                        icon
                        fluid
                        color="yellow"
                        onClick={acceptInvitation}>
                        <span>Accept Invitation&nbsp;</span>
                        <Icon name="check" />
                    </Button>

                    <Button
                        icon
                        fluid
                        color="red"
                        onClick={declineInvitation}>
                        <span>Decline Invitation&nbsp;</span>
                        <Icon name="delete" />
                    </Button>
                </ButtonGroup>}

                {isInGroup && <Button
                    icon
                    fluid
                    color="teal"
                    onClick={() => props.addResult(group.id)}>
                    <span>Submit Result&nbsp;</span>
                    <Icon name="edit" />
                </Button>}
            </div>}
        </div>
    )
}
