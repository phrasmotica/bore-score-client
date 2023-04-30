import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-semantic-toasts"
import { Table } from "semantic-ui-react"
import moment from "moment"

import { CooperativeScoreCard } from "./CooperativeScoreCard"
import { CooperativeWinCard } from "./CooperativeWinCard"
import { IndividualScoreCard } from "./IndividualScoreCard"
import { IndividualWinnerCard } from "./IndividualWinnerCard"
import { ResultApprover } from "./ResultApprover"

import { GameImage } from "../GameImage"

import { displayDateTimeValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { Group } from "../models/Group"
import { Player } from "../models/Player"
import { Result, ApprovalState } from "../models/Result"
import { WinMethodName } from "../models/WinMethod"

import "./ResultCard.css"

interface ResultCardProps {
    result: Result
    games: Game[]
    groups: Group[]
    players: Player[]
    currentUser?: string
}

export const ResultCard = (props: ResultCardProps) => {
    const [verificationState, setVerificationState] = useState(ApprovalState.Pending)

    let r = props.result

    let game = props.games.find(g => g.name === r.gameName)

    if (game === undefined) {
        return null
    }

    let bestScore = r.scores.reduce((a, b) => a.score > b.score ? a : b).score

    // players who were in the game
    let playersWithNames = r.scores.map(s => {
        let player = props.players.find(p => p.username === s.username)

        return {
            displayName: player?.displayName ?? "(unknown player)",
            hasBestScore: s.score === bestScore,
            ...s
        }
    })

    const renderScoresSummary = () => {
        switch (game?.winMethod) {
            case WinMethodName.IndividualScore:
                return <IndividualScoreCard players={playersWithNames} />

            case WinMethodName.IndividualWin:
                return <IndividualWinnerCard players={playersWithNames} />

            case WinMethodName.CooperativeScore:
                return <CooperativeScoreCard players={playersWithNames} score={r.cooperativeScore} />

            case WinMethodName.CooperativeWin:
                return <CooperativeWinCard players={playersWithNames} isWin={r.cooperativeWin} />
        }

        return null
    }

    let group = props.groups.find(gr => gr.name === r.groupName)

    const renderGroupName = () => {
        let groupNameElement = <span>{group?.displayName ?? r.groupName}</span>

        let linkToGroup = r.groupName.length > 0 && r.groupName !== "all"
        if (linkToGroup) {
            return (
                <Link to={`/groups/${r.groupName}`}>
                    {groupNameElement}
                </Link>
            )
        }

        return groupNameElement
    }

    // TODO: issue approvals/rejections to the database
    const approve = () => {
        setVerificationState(ApprovalState.Approved)
        toast({
            title: "",
            description: `You approved the ${game!.displayName} result.`,
            color: "green",
            icon: "check circle outline",
        })
    }

    const reject = () => {
        setVerificationState(ApprovalState.Rejected)
        toast({
            title: "",
            description: `You rejected the ${game!.displayName} result!`,
            color: "red",
            icon: "times circle outline",
        })
    }

    const hasCurrentUser = props.currentUser && r.scores.map(s => s.username).includes(props.currentUser)

    return (
        <Table.Row className={`result-card ${verificationState}`}>
            <Table.Cell>
                <GameImage imageSrc={game.imageLink} />
            </Table.Cell>

            <Table.Cell>
                <Link to={`/games/${game.name}`}>
                    {game.displayName}
                </Link>
            </Table.Cell>

            <Table.Cell>
                {renderScoresSummary()}
            </Table.Cell>

            <Table.Cell>
                {renderGroupName()}
            </Table.Cell>

            <Table.Cell>
                {displayDateTimeValue(moment.unix(r.timePlayed))}
            </Table.Cell>

            <Table.Cell>
                {displayDateTimeValue(moment.unix(r.timeCreated))}
            </Table.Cell>

            <Table.Cell>
                {r.notes}
            </Table.Cell>

            <Table.Cell>
                {hasCurrentUser && <ResultApprover approve={approve} reject={reject} />}
            </Table.Cell>
        </Table.Row>
    )
}
