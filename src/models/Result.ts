export interface Result {
    id: string
    gameName: string
    groupName: string
    timestamp: number
    notes: string
    cooperativeScore: number
    cooperativeWin: boolean
    scores: PlayerScore[]
}

interface PlayerScore {
    username: string
    score: number
    isWinner: boolean
}
