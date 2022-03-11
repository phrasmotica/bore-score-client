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

export const sortResultsByRecent = (results: Result[]) => {
    let sortedResults = [...results]
    sortedResults.sort((a, b) => b.timeCreated - a.timeCreated)
    sortedResults.sort((a, b) => b.timePlayed - a.timePlayed)
    return sortedResults
}
