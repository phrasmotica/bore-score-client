import { useState } from "react"
import { Button, Icon } from "semantic-ui-react"

import { AddPlayerModal } from "../AddPlayerModal/AddPlayerModal"

import { useTitle } from "../Hooks"

export const AdminPage = () => {
    useTitle("Admin")

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
        </div>
    )
}
