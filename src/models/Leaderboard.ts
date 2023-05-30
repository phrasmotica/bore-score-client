export interface Leaderboard {
    groupId: string
    gameId: string
    playedCount: number
    leaderboard: Rank[]
}

export interface Rank {
    username: string
    pointsScored: number
    playedCount: number
}
