export interface Group {
    id: string
    name: string
    timeCreated: number
    displayName: string
    description: string
    profilePicture: string
    visibility: GroupVisibilityName
}

export enum GroupVisibilityName {
    Public = "public",
    Global = "global",
    Private = "private",
}
