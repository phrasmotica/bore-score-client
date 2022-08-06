import { Link, useParams } from "react-router-dom"

import { GroupDetails } from "./GroupDetails"

import { useGroup } from "../FetchHelpers"

interface GroupDetailsPageProps {

}

export const GroupDetailsPage = (props: GroupDetailsPageProps) => {
    let { name } = useParams()

    const { group } = useGroup(name)

    if (group === undefined) {
        return null
    }

    return (
        <div className="group-details-page">
            <div className="header">
                <Link to="/groups">
                    <span>&larr;&nbsp;Back to groups list</span>
                </Link>
            </div>

            <GroupDetails group={group} />
        </div>
    )
}
