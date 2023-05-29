export interface Leaderboard {
    groupId: string
    gameId: string
    leaderboard: Rank[]
}

export interface Rank {
    username: string
    pointsScored: number
}
