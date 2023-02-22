import { GroupsTable } from "./GroupsTable"

import { useGroups } from "../FetchHelpers"
import { useTitle } from "../Hooks"

import "./GroupsPage.css"

export const GroupsPage = () => {
    useTitle("Groups")

    const { groups } = useGroups()

    return (
        <div className="groups-page">
            <div className="groups-page-body">
                <div className="header">
                    <h2>Groups</h2>
                </div>

                <GroupsTable
                    groups={groups} />
            </div>
        </div>
    )
}
