import { Link } from "react-router-dom"
import { toast } from "react-semantic-toasts"
import { Accordion, Icon, SemanticCOLORS, SemanticICONS } from "semantic-ui-react"
import moment from "moment"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { v4 as newGuid } from "uuid"

import { CooperativeScoreCard } from "./CooperativeScoreCard"
import { CooperativeWinCard } from "./CooperativeWinCard"
import { IndividualScoreCard } from "./IndividualScoreCard"
import { IndividualWinnerCard } from "./IndividualWinnerCard"
import { ResultApprover } from "./ResultApprover"

import { GameImage } from "../GameImage"

import { parseToken } from "../Auth"
import { postApproval } from "../FetchHelpers"
import { groupBy } from "../Helpers"
import { displayDateTimeValue } from "../MomentHelpers"
import { useApprovals } from "../QueryHelpers"

import { Approval, ApprovalStatus, sortApprovalsByRecent } from "../models/Approval"
import { Game } from "../models/Game"
import { Group } from "../models/Group"
import { Player } from "../models/Player"
import { Result } from "../models/Result"
import { WinMethodName } from "../models/WinMethod"

import "./ResultCard.css"
import { useState } from "react"

interface ResultCardProps {
    result: Result
    games: Game[]
    groups: Group[]
    players: Player[]
    currentUser?: string
    approvals?: boolean
    hideGroups?: boolean
}

export const ResultCard = (props: ResultCardProps) => {
    const [showDetails, setShowDetails] = useState(false)

    let r = props.result

    const token = parseToken()

    const queryClient = useQueryClient()

    const { data: approvals } = useApprovals(r.id, token !== null)

    // TODO: add error handling
    const { mutate: addApproval } = useMutation({
        mutationFn: postApproval,
        onSuccess: (data: Approval) => {
            let description = `You approved the ${game!.displayName} result.`
            let colour = "green"
            let icon = "check circle outline"

            if (data.approvalStatus === ApprovalStatus.Rejected) {
                description = `You rejected the ${game!.displayName} result!`
                colour = "red"
                icon = "times circle outline"
            }

            toast({
                title: "",
                description: description,
                color: colour as SemanticCOLORS,
                icon: icon as SemanticICONS,
            })

            queryClient.invalidateQueries({
                queryKey: ["approvals", r.id]
            })
        },
    })

    let game = props.games.find(g => g.name === r.gameName)

    if (game === undefined) {
        return null
    }

    const hasCurrentUser = props.currentUser && r.scores.map(s => s.username).includes(props.currentUser)

    const approvalGroups = groupBy(approvals ?? [], a => a.username)
    const approvalMap = new Map<string, ApprovalStatus>()

    for (let group of approvalGroups) {
        let latestStatus = sortApprovalsByRecent(group[1])[0]
        approvalMap.set(group[0], latestStatus.approvalStatus)
    }

    let overallApproval = ApprovalStatus.Pending

    const approvedCount = [...approvalMap.values()].filter(a => a === ApprovalStatus.Approved).length

    const isApproved = approvedCount === r.scores.length
    if (isApproved) {
        overallApproval = ApprovalStatus.Approved
    }

    const rejectedCount = [...approvalMap.values()].filter(a => a === ApprovalStatus.Rejected).length

    const isRejected = rejectedCount === r.scores.length
    if (isRejected) {
        overallApproval = ApprovalStatus.Rejected
    }

    let bestScore = r.scores.reduce((a, b) => a.score > b.score ? a : b).score

    // players who were in the game
    let playersWithNames = r.scores.map(s => {
        let player = props.players.find(p => p.username === s.username)

        let approvalStatus = ApprovalStatus.Pending
        if (player) {
            approvalStatus = approvalMap.get(player.username) ?? ApprovalStatus.Pending
        }

        return {
            displayName: player?.displayName || "",
            hasBestScore: s.score === bestScore,
            approvalStatus: approvalStatus,
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

    const approve = () => addApproval({
        id: newGuid(),
        resultId: r.id,
        timeCreated: moment().unix(),
        username: token?.username || "",
        approvalStatus: ApprovalStatus.Approved,
    })

    const reject = () => addApproval({
        id: newGuid(),
        resultId: r.id,
        timeCreated: moment().unix(),
        username: token?.username || "",
        approvalStatus: ApprovalStatus.Rejected,
    })

    return (
        <Accordion styled fluid className={`result-card-header ${overallApproval}`}>
            <Accordion.Title active={showDetails} onClick={() => setShowDetails(s => !s)}>
                <span>
                    <h3>{game.displayName}</h3>&nbsp;
                    <em>at {displayDateTimeValue(moment.unix(r.timePlayed))}</em>
                </span>
                <Icon name="chevron left" />
            </Accordion.Title>

            <Accordion.Content active={showDetails}>
                <div className={`result-card ${overallApproval}`}>
                    <div className="left">
                        <GameImage imageSrc={game.imageLink} />

                        <div className="result-text">
                            <div className="result-header">
                                <Link to={`/games/${game.name}`}>
                                    {game.displayName}
                                </Link>

                                <div className="labels">

                                </div>
                            </div>

                            <div className="result-content">
                                <div>
                                    {renderScoresSummary()}
                                </div>

                                {!props.hideGroups && <div>
                                    {renderGroupName()}
                                </div>}

                                <div>
                                    {r.notes}
                                </div>
                            </div>
                        </div>
                    </div>

                    {props.approvals && <div className="right">
                        {hasCurrentUser && overallApproval === ApprovalStatus.Pending && <ResultApprover
                            approveEnabled={approvalMap.get(props.currentUser!) !== ApprovalStatus.Approved}
                            approve={approve}
                            rejectEnabled={approvalMap.get(props.currentUser!) !== ApprovalStatus.Rejected}
                            reject={reject} />}
                    </div>}
                </div>
            </Accordion.Content>
        </Accordion>
    )
}
