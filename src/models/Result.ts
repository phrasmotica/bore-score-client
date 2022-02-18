export interface Result {
    id: number
    gameId: number
    timestamp: number
    scores: PlayerScore[]
}

interface PlayerScore {
    username: string
    score: number
    isWinner: boolean
}
