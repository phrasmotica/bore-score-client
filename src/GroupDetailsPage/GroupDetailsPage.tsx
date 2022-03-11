import { useParams } from "react-router-dom"

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
                <a href="/groups">
                    <span>&larr;&nbsp;Back to groups list</span>
                </a>
            </div>

            <GroupDetails group={group} />
        </div>
    )
}
