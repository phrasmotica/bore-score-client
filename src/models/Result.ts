export interface Result {
    id: string
    gameName: string
    timestamp: number
    cooperativeScore: number
    cooperativeWin: boolean
    scores: PlayerScore[]
}

interface PlayerScore {
    username: string
    score: number
    isWinner: boolean
}
