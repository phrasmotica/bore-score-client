import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-semantic-toasts"
import { Accordion, Icon, List, SemanticCOLORS, SemanticICONS } from "semantic-ui-react"
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
import { ResultResponse } from "../models/Result"
import { WinMethodName } from "../models/WinMethod"

import "./ResultCard.css"

interface ResultCardProps {
    result: ResultResponse
    games: Game[]
    groups: Group[]
    players: Player[]
    approvals?: boolean
    hideGroups?: boolean
}

export const ResultCard = (props: ResultCardProps) => {
    const [showDetails, setShowDetails] = useState(false)

    let r = props.result

    const token = parseToken()
    const username = token?.username ?? ""

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

    let game = props.games.find(g => g.id === r.gameId)

    if (game === undefined) {
        return null
    }

    const hasCurrentUser = username && r.scores.map(s => s.username).includes(username)

    const approvalGroups = groupBy(approvals ?? [], a => a.username)
    const approvalMap = new Map<string, ApprovalStatus>()

    for (let group of approvalGroups) {
        let latestStatus = sortApprovalsByRecent(group[1])[0]
        approvalMap.set(group[0], latestStatus.approvalStatus)
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

    const renderScoreCard = () => {
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

    let group = props.groups.find(gr => gr.id === r.groupId)

    const renderGroupLink = () => {
        if (r.groupId) {
            return (
                <div className="group-link">
                    Posted in <Link to={`/groups/${r.groupId}`}>
                        <span>{group?.displayName ?? "(unknown group)"}</span>
                    </Link>
                </div>
            )
        }

        return null
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

    const createIcon = (approvalStatus: ApprovalStatus) => {
        let colour = "black"
        let iconName = "question circle outline"

        if (approvalStatus === ApprovalStatus.Rejected) {
            colour = "red"
            iconName = "times circle outline"
        }

        if (approvalStatus === ApprovalStatus.Approved) {
            colour = "green"
            iconName = "check circle outline"
        }

        return <Icon className="approval-icon" name={iconName as SemanticICONS} color={colour as SemanticCOLORS} />
    }

    let groupName = group?.displayName ?? "(unknown group)"
    let showGroup = !props.hideGroups && r.groupId.length > 0
    let showApprovals = props.approvals && hasCurrentUser && r.approvalStatus === ApprovalStatus.Pending

    return (
        <List.Item>
            <Accordion styled fluid className={`result-card-header ${r.approvalStatus}`}>
                <Accordion.Title active={showDetails} onClick={() => setShowDetails(s => !s)}>
                    <span>
                        {createIcon(r.approvalStatus)}
                        <h3>{game.displayName}</h3>&nbsp;
                        <em>at {displayDateTimeValue(moment.unix(r.timePlayed))}</em>&nbsp;
                        {showGroup && <em>in {groupName}</em>}
                    </span>

                    <Icon name="chevron left" />
                </Accordion.Title>

                <Accordion.Content active={showDetails}>
                    <div className={`result-card ${r.approvalStatus}`}>
                        {showApprovals && <div className="approval">
                            <div>
                                <span><em>Approve this result?</em></span>
                            </div>

                            <div className="result-approver">
                                <ResultApprover
                                    approveEnabled={approvalMap.get(username!) !== ApprovalStatus.Approved}
                                    approve={approve}
                                    rejectEnabled={approvalMap.get(username!) !== ApprovalStatus.Rejected}
                                    reject={reject} />
                            </div>
                        </div>}

                        <div className="details">
                            <GameImage imageSrc={game.imageLink} />

                            <div className="result-text">
                                <div className="result-content">
                                    <div className="score-card">
                                        {renderScoreCard()}
                                        {showGroup && renderGroupLink()}
                                    </div>

                                    <div>
                                        {r.notes}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion>
        </List.Item>
    )
}
