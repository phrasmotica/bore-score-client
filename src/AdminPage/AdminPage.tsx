import { useState } from "react"
import { useNavigate } from "react-router"
import { Button, Icon } from "semantic-ui-react"

import { AddPlayerModal } from "../AddPlayerModal/AddPlayerModal"

import { useTitle } from "../Hooks"

export const AdminPage = () => {
    useTitle("Admin")

    const navigate = useNavigate()

    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)

    return (
        <div className="admin-page">
            <AddPlayerModal open={showAddPlayerModal} setOpen={setShowAddPlayerModal} />

            <h2>Admin</h2>

            <Button
                icon
                color="yellow"
                onClick={() => setShowAddPlayerModal(true)}>
                <span>Add New Player&nbsp;</span>
                <Icon name="plus" />
            </Button>

            <Button
                icon
                color="yellow"
                onClick={() => navigate("/add-game")}>
                <span>Add New Game&nbsp;</span>
                <Icon name="plus" />
            </Button>
        </div>
    )
}
