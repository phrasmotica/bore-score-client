export interface Group {
    id: string
    timeCreated: number
    displayName: string
    description: string
    profilePicture: string
    visibility: GroupVisibilityName
    createdBy: string
}

export interface GroupResponse {
    id: string
    timeCreated: number
    displayName: string
    description: string
    profilePicture: string
    visibility: GroupVisibilityName
    createdBy: string
    memberCount: number
}

export enum GroupVisibilityName {
    Public = "public",
    Global = "global",
    Private = "private",
}
