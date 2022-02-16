export interface Game {
    id: number
    name: string
    gameType: GameType
    minPlayers: number
    maxPlayers: number
}

export enum GameType {
    Score = "Score",
}
