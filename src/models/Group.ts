export interface Group {
    id: string
    name: string
    timeCreated: number
    type: GroupTypeName
    displayName: string
    description: string
}

export enum GroupTypeName {
    Public = "public",
    Global = "global",
    Private = "private",
}
