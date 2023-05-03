import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { GroupDetails } from "./GroupDetails"

import { resetTitle, setTitle } from "../Helpers"
import { useGroup } from "../QueryHelpers"

interface GroupDetailsPageProps {

}

export const GroupDetailsPage = (props: GroupDetailsPageProps) => {
    let { name } = useParams()

    const location = useLocation()
    const navigate = useNavigate()

    const { data: group } = useGroup(name || "", error => {
        if (error.message === "unauthorised") {
            navigate("/login?redirect=" + encodeURIComponent(location.pathname))
        }
    })

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
