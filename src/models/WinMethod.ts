export interface WinMethod {
    id: string
    name: WinMethodName
    timeCreated: number
    displayName: string
}

export enum WinMethodName {
    IndividualScore = "individual-score",
    IndividualWin = "individual-win",
    CooperativeScore = "cooperative-score",
    CooperativeWin = "cooperative-win",
}
