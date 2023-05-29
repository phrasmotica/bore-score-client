import { useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-semantic-toasts"

import { GroupLeaderboard } from "./GroupLeaderboard"

import { parseToken } from "../Auth"
import { resetTitle, setTitle } from "../Helpers"
import { useGroup } from "../QueryHelpers"

interface GroupLeaderboardPageProps {

}

export const GroupLeaderboardPage = (props: GroupLeaderboardPageProps) => {
    let { groupId } = useParams()

    const token = parseToken()

    const location = useLocation()
    const navigate = useNavigate()

    const { data: group } = useGroup(groupId || "", error => {
        if (error.isUnauthorised()) {
            if (token) {
                groupAccessDeniedToast()
                navigate("/groups")
            }
            else {
                navigate("/login?redirect=" + encodeURIComponent(location.pathname))
            }
        }

        if (error.isNotFound()) {
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

    const backLink = `/groups/${group.id}`

    return (
        <div className="group-leaderboard-page">
            <div className="header">
                <Link to={backLink}>
                    <span>&larr;&nbsp;Back to group details</span>
                </Link>
            </div>

            <GroupLeaderboard group={group} />
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
