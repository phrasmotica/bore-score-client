import { useState } from "react"
import { Accordion, Icon, List, SemanticCOLORS, SemanticICONS } from "semantic-ui-react"
import moment from "moment"

import { ResultApprover } from "../ResultsPage/ResultApprover"

import { GameImage } from "../GameImage"

import { displayDateTimeValue } from "../MomentHelpers"

import { Group } from "../models/Group"
import { GroupInvitation, InvitationStatus } from "../models/GroupMembership"

import "./InvitationCard.css"

interface InvitationCardProps {
    invitation: GroupInvitation
    groups: Group[]
}

export const InvitationCard = (props: InvitationCardProps) => {
    const [showDetails, setShowDetails] = useState(false)

    let i = props.invitation

    let group = props.groups.find(gr => gr.id === i.groupId)

    const accept = () => {}

    const decline = () => {}

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
    let showApprovals = i.invitationStatus === InvitationStatus.Sent

    return (
        <List.Item>
            <Accordion styled fluid className={`invitation-card-header ${i.invitationStatus}`}>
                <Accordion.Title active={showDetails} onClick={() => setShowDetails(s => !s)}>
                    <span>
                        {createIcon(i.invitationStatus)}
                        <h3>{groupName}</h3>&nbsp;
                        <em>at {displayDateTimeValue(moment.unix(i.timeCreated))}</em>&nbsp;
                    </span>

                    <Icon name="chevron left" />
                </Accordion.Title>

                <Accordion.Content active={showDetails}>
                    <div className={`invitation-card ${i.invitationStatus}`}>
                        {showApprovals && <div className="approval">
                            <div>
                                <span><em>Accept this invitation?</em></span>
                            </div>

                            <div className="result-approver">
                                <ResultApprover
                                    approveEnabled={true}
                                    approve={accept}
                                    rejectEnabled={true}
                                    reject={decline} />
                            </div>
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
