export interface Result {
    id: number
    gameId: number
    playerScores: PlayerScore[]
}

interface PlayerScore {
    playerId: number
    score: number
}
