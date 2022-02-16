export interface Game {
    id: number
    name: string
    gameType: GameType
    synopsis: string
    description: string
    minPlayers: number
    maxPlayers: number
}

export enum GameType {
    Score = "Score",
}
