export interface Game {
    id: number
    name: string
    winMethod: WinMethod
    synopsis: string
    description: string
    minPlayers: number
    maxPlayers: number
}

export enum WinMethod {
    IndividualScore = "Individual Score",
}
