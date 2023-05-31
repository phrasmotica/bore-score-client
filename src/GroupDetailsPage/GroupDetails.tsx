import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import moment from "moment"
import { Button, ButtonGroup, Icon, Message } from "semantic-ui-react"
import { v4 as newGuid } from "uuid"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GameImage } from "../GameImage"
import { InviteUsersModal } from "../InviteUsersModal/InviteUsersModal"
import { MemberList } from "./MemberList"
import { ResultsList } from "../ResultsPage/ResultsList"

import { parseToken } from "../Auth"
import { displayDateValue } from "../MomentHelpers"
import { useAcceptGroupInvitation, useAddGroupMembership, useDeclineGroupInvitation } from "../Mutations"
import { useGames, useGroupInvitations, useGroupMemberships, usePlayer, usePlayers, useResultsForGroup } from "../QueryHelpers"

import { GroupResponse, GroupVisibilityName } from "../models/Group"
import { InvitationStatus } from "../models/GroupMembership"

import "./GroupDetails.css"
import { GroupVisibilityLabel } from "../GroupVisibilityLabel"

interface GroupDetailsProps {
    group: GroupResponse
}

export const GroupDetails = (props: GroupDetailsProps) => {
    const [showAddResultModal, setShowAddResultModal] = useState(false)
    const [showInviteUsersModal, setShowInviteUsersModal] = useState(false)
    const [resultsErrorMessage, setResultsErrorMessage] = useState("")

    const token = parseToken()
    const username = token?.username || ""

    const { data: games } = useGames()
    const { data: memberships } = useGroupMemberships(username)
    const { data: players } = usePlayers(props.group.id) // TODO: disable this query if not a member
    const { data: creator } = usePlayer(props.group.createdBy)

    const { data: invitations } = useGroupInvitations(username)

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

    const location = useLocation()

    const queryClient = useQueryClient()

    const { mutate: addGroupMembership } = useAddGroupMembership(queryClient, props.group, username)
    const { mutate: acceptGroupInvitation } = useAcceptGroupInvitation(queryClient, props.group, username)
    const { mutate: declineGroupInvitation } = useDeclineGroupInvitation(queryClient, props.group)

    let imageSrc = props.group.profilePicture

    const members = players ?? []

    const isInGroup = (memberships ?? []).some(m => m.groupId === props.group.id)
    const canInvite = isInGroup && props.group.visibility === GroupVisibilityName.Private

    const invitation = (invitations ?? []).find(i => i.groupId === props.group.id && i.invitationStatus === InvitationStatus.Sent)
    const isInvitedToGroup = !isInGroup && invitation !== undefined

    const canJoinGroup = username.length > 0 && !isInGroup && props.group.visibility === GroupVisibilityName.Public

    const joinGroup = () => addGroupMembership({
        id: newGuid(),
        timeCreated: moment().unix(),
        groupId: props.group.id,
        username: username,
        inviterUsername: "",
    })

    const acceptInvitation = () => {
        if (invitation) {
            acceptGroupInvitation(invitation.id)
        }
    }

    const declineInvitation = () => {
        if (invitation) {
            declineGroupInvitation(invitation.id)
        }
    }

    const leaderboardsLink = location.pathname + "/leaderboards"

    return (
        <div className="group-details">
            <AddResultModal group={props.group.id} open={showAddResultModal} setOpen={setShowAddResultModal} />
            <InviteUsersModal group={props.group} open={showInviteUsersModal} setOpen={setShowInviteUsersModal} />

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

                    {isInvitedToGroup && <ButtonGroup vertical fluid>
                        <Button
                            icon
                            color="yellow"
                            onClick={acceptInvitation}>
                            <span>Accept Invitation&nbsp;</span>
                            <Icon name="check" />
                        </Button>

                        <Button
                            icon
                            color="red"
                            onClick={declineInvitation}>
                            <span>Decline Invitation&nbsp;</span>
                            <Icon name="delete" />
                        </Button>
                    </ButtonGroup>}

                    {isInGroup && <Button
                        icon
                        fluid
                        color="teal"
                        onClick={() => setShowAddResultModal(true)}>
                        <span>Submit Result&nbsp;</span>
                        <Icon name="edit" />
                    </Button>}

                    {canInvite && <Button
                        icon
                        fluid
                        color="yellow"
                        onClick={() => setShowInviteUsersModal(true)}>
                        <span>Invite Users&nbsp;</span>
                        <Icon name="users" />
                    </Button>}

                    {isInGroup && <Link to={leaderboardsLink}>
                        <Button
                            icon
                            fluid
                            color="blue">
                            <span>View Leaderboards&nbsp;</span>
                            <Icon name="trophy" />
                        </Button>
                    </Link>}
                </div>

                <div className="details">
                    <div className="group-header">
                        <div>
                            <h3>
                                {props.group.displayName}
                            </h3>
                        </div>

                        <div className="labels">
                            <GroupVisibilityLabel group={props.group} />
                        </div>
                    </div>

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

                    {resultsErrorMessage && <Message error className="no-results-message">
                        {resultsErrorMessage}
                    </Message>}

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
