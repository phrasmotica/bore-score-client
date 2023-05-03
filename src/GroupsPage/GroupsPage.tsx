import { useState } from "react"
import { Button, Icon } from "semantic-ui-react"

import { GroupsTable } from "./GroupsTable"

import { AddGroupModal } from "../AddGroupModal/AddGroupModal"

import { parseToken } from "../Auth"
import { useTitle } from "../Hooks"
import { useGroups } from "../QueryHelpers"

import "./GroupsPage.css"

export const GroupsPage = () => {
    useTitle("Groups")

    const { data: groups } = useGroups()

    const token = parseToken()

    const [showAddGroupModal, setShowAddGroupModal] = useState(false)

    return (
        <div className="groups-page">
            <AddGroupModal open={showAddGroupModal} setOpen={setShowAddGroupModal} />

            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">

                </div>
            </div>

            <div className="groups-page-body">
                <div className="header">
                    <h2>Groups</h2>

                    {token && <Button
                        icon
                        color="yellow"
                        onClick={() => setShowAddGroupModal(true)}>
                        <span>Add New Group&nbsp;</span>
                        <Icon name="plus" />
                    </Button>}
                </div>

                <GroupsTable
                    groups={groups ?? []} />
            </div>
        </div>
    )
}
