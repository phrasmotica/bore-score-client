export interface ScoreCardProps {
    players: {
        username: string
        displayName: string
        score: number
        hasBestScore: boolean
        isWinner: boolean
    }[]
}
