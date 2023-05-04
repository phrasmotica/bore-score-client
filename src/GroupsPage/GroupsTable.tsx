import { useState } from "react"
import { Table } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GroupCard } from "./GroupCard"

import { parseToken } from "../Auth"

import { Group } from "../models/Group"

interface GroupsTableProps {
    groups: Group[]
}

export const GroupsTable = (props: GroupsTableProps) => {
    const [selectedGroup, setSelectedGroup] = useState("")
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    const token = parseToken()

    let groupsToShow = [...props.groups]

    return (
        <div className="groups-table">
            <AddResultModal group={selectedGroup} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <Table celled color="teal">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={2}>Group</Table.HeaderCell>
                        {token && <Table.HeaderCell width={2}></Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {groupsToShow.map(g => {
                        const addResult = () => {
                            setSelectedGroup(g.name)
                            setShowAddResultModal(true)
                        }

                        return <GroupCard key={g.id} group={g} addResult={addResult} />
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
