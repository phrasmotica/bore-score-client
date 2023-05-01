import { GroupsTable } from "./GroupsTable"

import { useTitle } from "../Hooks"
import { useGroups } from "../QueryHelpers"

import "./GroupsPage.css"

export const GroupsPage = () => {
    useTitle("Groups")

    const { data: groups } = useGroups()

    return (
        <div className="groups-page">
            <div className="groups-page-body">
                <div className="header">
                    <h2>Groups</h2>
                </div>

                <GroupsTable
                    groups={groups ?? []} />
            </div>
        </div>
    )
}
