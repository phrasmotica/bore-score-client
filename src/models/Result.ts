import { ApprovalStatus } from "./Approval"

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

export interface ResultResponse {
    id: string
    gameName: string
    groupName: string
    timeCreated: number
    timePlayed: number
    notes: string
    cooperativeScore: number
    cooperativeWin: boolean
    scores: PlayerScore[]
    approvalStatus: ApprovalStatus
}

interface PlayerScore {
    username: string
    score: number
    isWinner: boolean
}

export const sortResultsByRecent = (results: ResultResponse[]) => {
    let sortedResults = [...results]
    sortedResults.sort(sortResultsByTimeDescending)
    return sortedResults
}

// sorts the results in descending order, first by the time they were created,
// then by the time they were played if necessary
const sortResultsByTimeDescending = (a: ResultResponse, b: ResultResponse) => {
    if (b.timeCreated === a.timeCreated) {
        return b.timePlayed - a.timePlayed
    }

    return b.timeCreated - a.timeCreated
}
