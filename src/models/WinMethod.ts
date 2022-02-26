export interface WinMethod {
    id: string
    name: WinMethodName
    timeCreated: number
    displayName: string
}

export enum WinMethodName {
    IndividualScore = "individual-score",
    IndividualWinner = "individual-winner",
    CooperativeScore = "cooperative-score",
}
