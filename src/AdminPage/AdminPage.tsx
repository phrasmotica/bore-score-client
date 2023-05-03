import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Button, Icon } from "semantic-ui-react"

import { AddGroupModal } from "../AddGroupModal/AddGroupModal"
import { AddPlayerModal } from "../AddPlayerModal/AddPlayerModal"

import { parseToken } from "../Auth"
import { useTitle } from "../Hooks"

export const AdminPage = () => {
    useTitle("Admin")

    const [showAddGroupModal, setShowAddGroupModal] = useState(false)
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!parseToken()) {
            navigate("/login?redirect=" + encodeURIComponent(location.pathname))
        }
    }, [navigate, location.pathname])

    return (
        <div className="admin-page">
            <AddGroupModal open={showAddGroupModal} setOpen={setShowAddGroupModal} />
            <AddPlayerModal open={showAddPlayerModal} setOpen={setShowAddPlayerModal} />

            <h2>Admin</h2>

            <Button
                icon
                color="yellow"
                onClick={() => setShowAddGroupModal(true)}>
                <span>Add New Group&nbsp;</span>
                <Icon name="plus" />
            </Button>

            <Button
                icon
                color="yellow"
                onClick={() => setShowAddPlayerModal(true)}>
                <span>Add New Player&nbsp;</span>
                <Icon name="plus" />
            </Button>
        </div>
    )
}
