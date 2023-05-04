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
import { useGames, useGroupMemberships, usePlayers, useResults } from "../QueryHelpers"

import { Group } from "../models/Group"

import "./GroupDetails.css"

interface GroupDetailsProps {
    group: Group
}

export const GroupDetails = (props: GroupDetailsProps) => {
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    const token = parseToken()
    const username = token?.username || ""

    const { data: games } = useGames()
    const { data: memberships } = useGroupMemberships(username)
    const { data: players } = usePlayers(props.group.name)
    const { data: results } = useResults({ group: props.group.name })

    const queryClient = useQueryClient()

    const { mutate: addGroupMembership } = useAddGroupMembership(queryClient, props.group, username)

    let imageSrc = props.group.profilePicture

    const members = players ?? []

    const isInGroup = memberships && memberships.some(m => m.groupId === props.group.id)

    const joinGroup = () => addGroupMembership({
        id: newGuid(),
        timeCreated: moment().unix(),
        groupId: props.group.id,
        username: username,
        inviterUsername: "",
    })

    return (
        <div className="group-details">
            <AddResultModal group={props.group.name} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <div className="content">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />

                    {username && !isInGroup && <Button
                        icon
                        fluid
                        color="yellow"
                        onClick={joinGroup}>
                        <span>Join Group&nbsp;</span>
                        <Icon name="users" />
                    </Button>}

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

                    {(!isInGroup || members.length <= 0) && <p className="members-count">
                        <em>{members.length} member(s)</em>
                    </p>}

                    {isInGroup && members.length > 0 && <MemberList members={members} />}

                    <h3>Recent Results</h3>

                    <ResultsList
                        hideGroups
                        games={games ?? []}
                        groups={[props.group]}
                        players={players ?? []}
                        results={results ?? []}
                        selectedGames={[]}
                        selectedGroups={[]} />
                </div>
            </div>
        </div>
    )
}
