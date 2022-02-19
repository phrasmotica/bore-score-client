export interface Game {
    id: string
    name: string
    timeCreated: number
    displayName: string
    synopsis: string
    description: string
    minPlayers: number
    maxPlayers: number
    winMethod: WinMethod
    links: Link[]
}

export enum WinMethod {
    IndividualScore = "Individual Score",
    IndividualWinner = "Individual Winner"
}

export interface Link {
    type: LinkType
    link: string
}

export enum LinkType {
    OfficialWebsite = "Official Website",
	BoardGameGeek = "BoardGameGeek",
}
