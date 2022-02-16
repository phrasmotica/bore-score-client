export interface Result {
    id: number
    gameId: number
    timestamp: number
    scores: PlayerScore[]
}

interface PlayerScore {
    playerId: number
    score: number
}
