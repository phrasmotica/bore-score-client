import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import moment from "moment"
import { Button, Icon } from "semantic-ui-react"
import { v4 as newGuid } from "uuid"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GameImage } from "../GameImage"
import { MemberList } from "./MemberList"
import { ResultsList } from "../ResultsPage/ResultsList"

import { parseToken } from "../Auth"
import { displayDateValue } from "../MomentHelpers"
import { useAddGroupMembership } from "../Mutations"
import { useGames, useGroupMemberships, usePlayer, usePlayers, useResultsForGroup } from "../QueryHelpers"

import { GroupResponse, GroupVisibilityName } from "../models/Group"
import { InvitationStatus } from "../models/GroupMembership"

import "./GroupDetails.css"

interface GroupDetailsProps {
    group: GroupResponse
}

export const GroupDetails = (props: GroupDetailsProps) => {
    const [showAddResultModal, setShowAddResultModal] = useState(false)
    const [resultsErrorMessage, setResultsErrorMessage] = useState("")

    const token = parseToken()
    const username = token?.username || ""

    const { data: games } = useGames()
    const { data: memberships } = useGroupMemberships(username)
    const { data: players } = usePlayers(props.group.id) // TODO: disable this query if not a member
    const { data: creator } = usePlayer(props.group.createdBy)

    const { data: results } = useResultsForGroup(
        props.group.id,
        results => {
            setResultsErrorMessage("")
        },
        error => {
            if (error.response.status === 401) {
                if (token) {
                    setResultsErrorMessage("You must be a member to see this group's results.")
                }
                else {
                    setResultsErrorMessage("You must be logged in to see this group's results.")
                }
            }
        })

    const queryClient = useQueryClient()

    const { mutate: addGroupMembership } = useAddGroupMembership(queryClient, props.group, username)

    let imageSrc = props.group.profilePicture

    const members = players ?? []

    const isInGroup = memberships && memberships.some(m => m.groupId === props.group.id)
    const canJoinGroup = username.length > 0 && !isInGroup && props.group.visibility === GroupVisibilityName.Public

    const joinGroup = () => addGroupMembership({
        id: newGuid(),
        timeCreated: moment().unix(),
        groupId: props.group.id,
        username: username,
        inviterUsername: "",
    })

    return (
        <div className="group-details">
            <AddResultModal group={props.group.id} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <div className="content">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />

                    {canJoinGroup && <Button
                        icon
                        fluid
                        color="yellow"
                        onClick={joinGroup}>
                        <span>Join Group&nbsp;</span>
                        <Icon name="users" />
                    </Button>}

                    {/* TODO: show button for accepting invite, if applicable */}

                    {isInGroup && <Button
                        icon
                        fluid
                        color="teal"
                        onClick={() => setShowAddResultModal(true)}>
                        <span>Submit Result&nbsp;</span>
                        <Icon name="edit" />
                    </Button>}
                </div>

                <div className="details">
                    <h3 className="display-name-header">
                        {props.group.displayName}
                    </h3>

                    <p className="description">
                        {props.group.description}
                    </p>

                    <p className="time-created">
                        <em>Created on {displayDateValue(moment.unix(props.group.timeCreated))}</em>
                    </p>

                    {!isInGroup && <p className="members-count">
                        <em>{props.group.memberCount} member(s)</em>
                    </p>}

                    {isInGroup && members.length > 0 && <MemberList members={members} creatorUsername={creator?.username || ""} />}
                </div>

                <div className="results">
                    <h3>Recent Results</h3>

                    {resultsErrorMessage && <p className="no-results-message">
                        {resultsErrorMessage}
                    </p>}

                    {!resultsErrorMessage && <ResultsList
                        hideGroups
                        games={games ?? []}
                        groups={[props.group]}
                        players={players ?? []}
                        results={results ?? []} />}
                </div>
            </div>
        </div>
    )
}
