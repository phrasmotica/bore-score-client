export interface Result {
    id: string
    gameName: string
    timestamp: number
    scores: PlayerScore[]
}

interface PlayerScore {
    username: string
    score: number
    isWinner: boolean
}
