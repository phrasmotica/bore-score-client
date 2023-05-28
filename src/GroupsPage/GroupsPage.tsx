import { useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"

import { GroupsList } from "./GroupsList"

import { AddGroupModal } from "../AddGroupModal/AddGroupModal"

import { parseToken } from "../Auth"
import { Filter, FilterSet } from "../Filters"
import { useTitle } from "../Hooks"
import { useGroups } from "../QueryHelpers"

import { Group, GroupVisibilityName } from "../models/Group"

import "./GroupsPage.css"

export const GroupsPage = () => {
    useTitle("Groups")

    const { data: groups } = useGroups()

    const token = parseToken()

    const [showAddGroupModal, setShowAddGroupModal] = useState(false)
    const [showPublicOnly, setShowPublicOnly] = useState(false)

    let filters = new FilterSet<Group>()
        .with("visibility", new Filter(showPublicOnly, g => g.visibility === GroupVisibilityName.Public))

    let allGroups = groups ?? []
    let filteredGroups = filters.apply(allGroups)

    return (
        <div className="groups-page">
            <AddGroupModal open={showAddGroupModal} setOpen={setShowAddGroupModal} />

            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">
                    <Form className="filters-form">
                        <Form.Checkbox
                            label="Public groups only"
                            checked={showPublicOnly}
                            onChange={(e, { checked }) => setShowPublicOnly(checked ?? false)}
                            disabled={filters.except("visibility").forceApply(allGroups, true).length <= 0} />
                    </Form>
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

                <GroupsList groups={filteredGroups} />
            </div>
        </div>
    )
}
