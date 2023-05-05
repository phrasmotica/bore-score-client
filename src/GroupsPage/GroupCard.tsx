import { useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { Button, Icon, Label } from "semantic-ui-react"
import moment from "moment"
import { v4 as newGuid } from "uuid"

import { GameImage } from "../GameImage"

import { parseToken } from "../Auth"
import { useAddGroupMembership } from "../Mutations"
import { useGroupMemberships } from "../QueryHelpers"

import { Group, GroupVisibilityName } from "../models/Group"

interface GroupCardProps {
    group: Group
    addResult: (name: string) => void
}

export const GroupCard = (props: GroupCardProps) => {
    const queryClient = useQueryClient()

    const token = parseToken()
    const username = token?.username || ""

    const group = props.group

    const { data: memberships } = useGroupMemberships(username)

    const { mutate: addGroupMembership } = useAddGroupMembership(queryClient, group, username)

    const isInGroup = memberships && memberships.some(m => m.groupId === group.id)

    const joinGroup = () => addGroupMembership({
        id: newGuid(),
        timeCreated: moment().unix(),
        groupId: group.id,
        username: username,
        inviterUsername: "",
    })

    const renderVisibilityLabel = (group: Group) => {
        const colour = group.visibility === GroupVisibilityName.Private ? "purple" : "green"

        return (
            <Label className="group-visibility-label" color={colour}>
                {group.visibility}
            </Label>
        )
    }

    // TODO: turn this into a GameCard-style div that can go in a list item
    return (
        <div key={group.name} className="group-card">
            <div className="left">
                <GameImage imageSrc={group.profilePicture} />

                <div className="group-text">
                    <div className="group-header">
                        <Link to={`/groups/${group.name}`}>
                            <h3>{group.displayName}</h3>
                        </Link>

                        <div className="labels">
                            {renderVisibilityLabel(group)}
                        </div>
                    </div>

                    <div className="group-content">
                        <em>{group.description || "N/A"}</em>
                    </div>
                </div>
            </div>

            {token && <div className="right">
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
                    onClick={() => props.addResult(group.name)}>
                    <span>Submit Result&nbsp;</span>
                    <Icon name="edit" />
                </Button>}
            </div>}
        </div>
    )
}
