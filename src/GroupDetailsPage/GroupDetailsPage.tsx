import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { GroupDetails } from "./GroupDetails"

import { useGroup } from "../FetchHelpers"
import { resetTitle, setTitle } from "../Helpers"

interface GroupDetailsPageProps {

}

export const GroupDetailsPage = (props: GroupDetailsPageProps) => {
    let { name } = useParams()

    const { group } = useGroup(name)

    useEffect(() => {
        if (group?.displayName) {
            setTitle("BoreScore - " + group.displayName)
        }
        else {
            resetTitle()
        }
    }, [group])

    if (group === undefined) {
        return null
    }

    return (
        <div className="group-details-page">
            <GroupDetails group={group} />
        </div>
    )
}
