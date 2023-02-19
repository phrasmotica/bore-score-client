import { useState } from "react"
import { Button, Icon } from "semantic-ui-react"

import { AddGameModal } from "../AddGameModal/AddGameModal"
import { AddPlayerModal } from "../AddPlayerModal/AddPlayerModal"

import { useTitle } from "../Hooks"

export const AdminPage = () => {
    useTitle("Admin")

    const [showAddGameModal, setShowAddGameModal] = useState(false)
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)

    return (
        <div className="admin-page">
            <AddGameModal open={showAddGameModal} setOpen={setShowAddGameModal} />
            <AddPlayerModal open={showAddPlayerModal} setOpen={setShowAddPlayerModal} />

            <h2>Admin</h2>

            <Button
                icon
                color="yellow"
                onClick={() => setShowAddGameModal(true)}>
                <span>Add New Game&nbsp;</span>
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
