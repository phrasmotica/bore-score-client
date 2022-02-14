export interface Result {
    id: number
    gameId: number
    scores: PlayerScore[]
}

interface PlayerScore {
    playerId: number
    score: number
}
