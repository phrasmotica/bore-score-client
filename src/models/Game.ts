import { WinMethodName } from "./WinMethod"

export interface Game {
    id: string
    name: string
    timeCreated: number
    displayName: string
    synopsis: string
    description: string
    minPlayers: number
    maxPlayers: number
    winMethod: WinMethodName
    links: Link[]
}

export interface Link {
    type: LinkType
    link: string
}

export enum LinkType {
    OfficialWebsite = "Official Website",
	BoardGameGeek = "BoardGameGeek",
}
