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
    approvalState: ApprovalState
}

interface PlayerScore {
    username: string
    score: number
    isWinner: boolean
}

export enum ApprovalState {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
}

export const sortResultsByRecent = (results: Result[]) => {
    let sortedResults = [...results]
    sortedResults.sort(sortResultsByTimeDescending)
    return sortedResults
}

// sorts the results in descending order, first by the time they were created,
// then by the time they were played if necessary
const sortResultsByTimeDescending = (a: Result, b: Result) => {
    if (b.timeCreated === a.timeCreated) {
        return b.timePlayed - a.timePlayed
    }

    return b.timeCreated - a.timeCreated
}
