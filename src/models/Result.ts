export interface Result {
    id: string
    gameName: string
    groupName: string
    timeCreated: number
    timePlayed: number
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
