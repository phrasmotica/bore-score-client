import { useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-semantic-toasts"

import { GroupDetails } from "./GroupDetails"

import { parseToken } from "../Auth"
import { PersistentError } from "../FetchHelpers"
import { resetTitle, setTitle } from "../Helpers"
import { useGroup } from "../QueryHelpers"

interface GroupDetailsPageProps {

}

export const GroupDetailsPage = (props: GroupDetailsPageProps) => {
    let { groupId } = useParams()

    const token = parseToken()

    const location = useLocation()
    const navigate = useNavigate()

    const { data: group } = useGroup(groupId || "", error => {
        if (error.message === PersistentError.Unauthorised) {
            if (token) {
                groupAccessDeniedToast()
                navigate("/groups")
            }
            else {
                navigate("/login?redirect=" + encodeURIComponent(location.pathname))
            }
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

const groupAccessDeniedToast = () => toast({
    title: "",
    description: "You do not have permission to view that group.",
    color: "red",
    icon: "dont",
})

const groupNotFoundToast = () => toast({
    title: "",
    description: "That group does not exist.",
    color: "red",
    icon: "delete",
})
