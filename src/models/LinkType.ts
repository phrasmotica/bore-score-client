export interface LinkType {
    id: string
    name: string
    timeCreated: number
    displayName: string
}

export enum LinkTypeName {
    OfficialWebsite = "official-website",
    BoardGameGeek = "board-game-geek",
}
