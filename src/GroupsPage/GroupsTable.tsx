import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Icon, Table } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GameImage } from "../GameImage"

import { parseToken } from "../Auth"
import { useGroupMemberships } from "../QueryHelpers"

import { Group } from "../models/Group"

interface GroupsTableProps {
    groups: Group[]
}

export const GroupsTable = (props: GroupsTableProps) => {
    const [selectedGroup, setSelectedGroup] = useState("")
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    const token = parseToken()
    const username = token?.username || ""

    const { data: memberships } = useGroupMemberships(username)

    let groupsToShow = [...props.groups]

    return (
        <div className="groups-table">
            <AddResultModal group={selectedGroup} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <Table celled color="teal">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={2}>Group</Table.HeaderCell>
                        <Table.HeaderCell width={6}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Visibility</Table.HeaderCell>
                        <Table.HeaderCell width={2}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {groupsToShow.map(g => {
                        const addResult = () => {
                            setSelectedGroup(g.name)
                            setShowAddResultModal(true)
                        }

                        const isInGroup = memberships && memberships.some(m => m.groupId === g.id)

                        // TODO: use mutation for this
                        const joinGroup = () => {

                        }

                        return (
                            <Table.Row key={g.name}>
                                <Table.Cell className="image-cell">
                                    <GameImage imageSrc={g.profilePicture} />
                                </Table.Cell>

                                <Table.Cell>
                                    <Link to={`/groups/${g.name}`}>
                                        {g.displayName}
                                    </Link>
                                </Table.Cell>

                                <Table.Cell>
                                    {g.description || "N/A"}
                                </Table.Cell>

                                <Table.Cell>
                                    {/* TODO: show visibility display name */}
                                    {g.visibility}
                                </Table.Cell>

                                <Table.Cell>
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
                                        onClick={addResult}>
                                        <span>Submit Result&nbsp;</span>
                                        <Icon name="edit" />
                                    </Button>}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
