import { useState } from "react"
import { List, Message } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GroupCard } from "./GroupCard"

import { Group } from "../models/Group"

interface GroupsListProps {
    groups: Group[]
}

export const GroupsList = (props: GroupsListProps) => {
    const [selectedGroup, setSelectedGroup] = useState("")
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    const renderNoGroupsMessage = () => (
        <Message className="no-groups-message">
            No groups to show.
        </Message>
    )

    let groupsToShow = [...props.groups]

    return (
        <div className="groups-table">
            <AddResultModal group={selectedGroup} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <List divided>
                {groupsToShow.length <= 0 && renderNoGroupsMessage()}
                {groupsToShow.length > 0 && groupsToShow.map(g => {
                    const addResult = () => {
                        setSelectedGroup(g.id)
                        setShowAddResultModal(true)
                    }

                    return (
                        <List.Item key={g.id}>
                            <GroupCard key={g.id} group={g} addResult={addResult} />
                        </List.Item>
                    )
                })}
            </List>
        </div>
    )
}
