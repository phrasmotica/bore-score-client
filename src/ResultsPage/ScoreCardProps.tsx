import { Icon, SemanticICONS, SemanticCOLORS } from "semantic-ui-react"

import { ApprovalStatus } from "../models/Approval"

export interface ScoreCardProps {
    players: {
        username: string
        displayName: string
        score: number
        hasBestScore: boolean
        isWinner: boolean
        approvalStatus: ApprovalStatus
    }[]
}

export const createIcon = (approvalStatus: ApprovalStatus) => {
    let tooltip = "Approval pending"
    let colour = "black"
    let iconName = "question circle outline"

    if (approvalStatus === ApprovalStatus.Rejected) {
        tooltip = "Rejected this result"
        colour = "red"
        iconName = "times circle outline"
    }

    if (approvalStatus === ApprovalStatus.Approved) {
        tooltip = "Approved this result"
        colour = "green"
        iconName = "check circle outline"
    }

    return <span title={tooltip}>
        <Icon name={iconName as SemanticICONS} color={colour as SemanticCOLORS} />
    </span>
}
