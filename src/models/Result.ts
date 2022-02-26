export interface Result {
    id: string
    gameName: string
    timestamp: number
    cooperativeScore: number
    scores: PlayerScore[]
}

interface PlayerScore {
    username: string
    score: number
    isWinner: boolean
}
