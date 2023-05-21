import { useState } from "react"
import { List } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GroupCard } from "./GroupCard"

import { Group } from "../models/Group"

interface GroupsListProps {
    groups: Group[]
}

export const GroupsList = (props: GroupsListProps) => {
    const [selectedGroup, setSelectedGroup] = useState("")
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    let groupsToShow = [...props.groups]

    return (
        <div className="groups-table">
            <AddResultModal group={selectedGroup} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <List divided>
                {groupsToShow.map(g => {
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
