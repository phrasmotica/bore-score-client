import { useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-semantic-toasts"

import { GroupDetails } from "./GroupDetails"

import { PersistentError } from "../FetchHelpers"
import { resetTitle, setTitle } from "../Helpers"
import { useGroup } from "../QueryHelpers"

interface GroupDetailsPageProps {

}

export const GroupDetailsPage = (props: GroupDetailsPageProps) => {
    let { name } = useParams()

    const location = useLocation()
    const navigate = useNavigate()

    const { data: group } = useGroup(name || "", error => {
        if (error.message === PersistentError.Unauthorised) {
            navigate("/login?redirect=" + encodeURIComponent(location.pathname))
        }

        if (error.message === PersistentError.NotFound) {
            groupNotFoundToast()
            navigate("/groups")
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
            <div className="header">
                <Link to="/groups">
                    <span>&larr;&nbsp;Back to groups list</span>
                </Link>
            </div>

            <GroupDetails group={group} />
        </div>
    )
}

const groupNotFoundToast = () => toast({
    title: "",
    description: "That group does not exist.",
    color: "red",
    icon: "delete",
})
