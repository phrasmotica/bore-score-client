import { useState } from "react"
import moment from "moment"
import { Button, Icon } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GameImage } from "../GameImage"
import { ResultsList } from "../ResultsPage/ResultsList"

import { parseToken } from "../Auth"
import { displayDateValue } from "../MomentHelpers"
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
    const { data: players } = usePlayers()
    const { data: results } = useResults({ group: props.group.name })

    let imageSrc = props.group.profilePicture

    const isInGroup = memberships && memberships.some(m => m.groupId === props.group.id)

    // TODO: use mutation for this
    const joinGroup = () => {

    }

    return (
        <div className="group-details">
            <AddResultModal group={props.group.name} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <div className="content">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />

                    {!isInGroup && <Button
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
                        <em>Added: {displayDateValue(moment.unix(props.group.timeCreated))}</em>
                    </p>

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
