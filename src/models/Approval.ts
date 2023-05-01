export interface Approval {
    id: string
    resultId: string
    timeCreated: number
    username: string
    approvalStatus: ApprovalStatus
}

export enum ApprovalStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
}

export const sortApprovalsByRecent = (approvals: Approval[]) => {
    let sortedApprovals = [...approvals]
    sortedApprovals.sort(sortByTimeDescending)
    return sortedApprovals
}

// sorts the approvals in descending order by the time they were created
const sortByTimeDescending = (a: Approval, b: Approval) => {
    return b.timeCreated - a.timeCreated
}
