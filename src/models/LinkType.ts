export interface LinkType {
    id: string
    name: LinkTypeName
    timeCreated: number
    displayName: string
}

export enum LinkTypeName {
    OfficialWebsite = "official-website",
    BoardGameGeek = "board-game-geek",
}
