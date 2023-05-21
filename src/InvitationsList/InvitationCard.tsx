import { useState } from "react"
import { Accordion, Button, ButtonGroup, Icon, List, SemanticCOLORS, SemanticICONS } from "semantic-ui-react"
import moment from "moment"
import { useQueryClient } from "@tanstack/react-query"

import { GameImage } from "../GameImage"

import { parseToken } from "../Auth"
import { displayDateTimeValue } from "../MomentHelpers"
import { useAcceptGroupInvitation, useDeclineGroupInvitation } from "../Mutations"

import { Group } from "../models/Group"
import { GroupInvitation, InvitationStatus } from "../models/GroupMembership"

import "./InvitationCard.css"

interface InvitationCardProps {
    invitation: GroupInvitation
    group: Group
}

export const InvitationCard = (props: InvitationCardProps) => {
    const queryClient = useQueryClient()

    const token = parseToken()
    const username = token?.username || ""

    const [showDetails, setShowDetails] = useState(false)

    let invitation = props.invitation
    let group = props.group

    const { mutate: acceptGroupInvitation } = useAcceptGroupInvitation(queryClient, group, username)
    const { mutate: declineGroupInvitation } = useDeclineGroupInvitation(queryClient, group)

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

    const createIcon = (approvalStatus: InvitationStatus) => {
        let colour = "black"
        let iconName = "question circle outline"

        if (approvalStatus === InvitationStatus.Declined) {
            colour = "red"
            iconName = "times circle outline"
        }

        if (approvalStatus === InvitationStatus.Accepted) {
            colour = "green"
            iconName = "check circle outline"
        }

        return <Icon className="approval-icon" name={iconName as SemanticICONS} color={colour as SemanticCOLORS} />
    }

    let groupName = group?.displayName ?? "(unknown group)"
    let showApprovals = invitation.invitationStatus === InvitationStatus.Sent

    return (
        <List.Item>
            <Accordion styled fluid className={`invitation-card-header ${invitation.invitationStatus}`}>
                <Accordion.Title active={showDetails} onClick={() => setShowDetails(s => !s)}>
                    <span>
                        {createIcon(invitation.invitationStatus)}
                        <h3>{groupName}</h3>&nbsp;
                        <em>at {displayDateTimeValue(moment.unix(invitation.timeCreated))}</em>&nbsp;
                    </span>

                    <Icon name="chevron left" />
                </Accordion.Title>

                <Accordion.Content active={showDetails}>
                    <div className={`invitation-card ${invitation.invitationStatus}`}>
                        {showApprovals && <div className="invitation-buttons">
                            <ButtonGroup fluid>
                                <Button
                                    icon
                                    color="yellow"
                                    onClick={acceptInvitation}>
                                    <span>Accept Invitation&nbsp;</span>
                                    <Icon name="check" />
                                </Button>

                                <Button
                                    icon
                                    color="red"
                                    onClick={declineInvitation}>
                                    <span>Decline Invitation&nbsp;</span>
                                    <Icon name="delete" />
                                </Button>
                            </ButtonGroup>
                        </div>}

                        <div className="details">
                            <GameImage imageSrc={group?.profilePicture ?? ""} />

                            <div className="invitation-text">
                                <div className="invitation-content">
                                    {group?.description ?? ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion>
        </List.Item>
    )
}
