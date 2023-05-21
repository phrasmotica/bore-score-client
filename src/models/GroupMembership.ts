export interface GroupMembership {
	id: string
	groupId: string
	timeCreated: number
	username: string
	inviterUsername: string
}

export interface GroupInvitation {
    id: string
	groupId: string
	timeCreated: number
	username: string
	inviterUsername: string
	invitationStatus: InvitationStatus
}

export enum InvitationStatus {
    Sent = "sent",
    Accepted = "accepted",
    Declined = "declined",
}
