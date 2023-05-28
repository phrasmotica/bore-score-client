import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Form } from "semantic-ui-react"
import { useQueryClient } from "@tanstack/react-query"

import { parseToken } from "../Auth"
import { useTitle } from "../Hooks"
import { useUpdateProfile } from "../Mutations"
import { PlayerImage } from "../PlayerImage"
import { usePlayer } from "../QueryHelpers"

import "react-semantic-toasts/styles/react-semantic-alert.css"
import "./ProfileEditPage.css"

export const ProfileEditPage = () => {
    useTitle("Edit Profile")

    const token = parseToken()
    const username = token?.username || ""

    const queryClient = useQueryClient()

    const { data: player } = usePlayer(username)

    const { mutate: updatePlayer, isLoading } = useUpdateProfile(() => {
        queryClient.invalidateQueries({
            queryKey: ["player", username],
        })
    })

    const [newDisplayName, setNewDisplayName] = useState("")
    const [newProfilePicture, setNewProfilePicture] = useState("")

    useEffect(() => {
        if (player) {
            setNewDisplayName(player.displayName)
            setNewProfilePicture(player.profilePicture)
        }
    }, [player])

    const formComplete = useMemo(
        () => (newProfilePicture.length > 0 && newProfilePicture !== player?.profilePicture)
            || (newDisplayName.length > 0 && newDisplayName !== player?.displayName),
        [newProfilePicture, newDisplayName, player])

    if (!token || !player) {
        return null
    }

    const submit = () => {
        if (formComplete) {
            updatePlayer({
                // TODO: remove unnecessary fields
                id: "",
                username: username,
                timeCreated: 0,
                displayName: newDisplayName,
                profilePicture: newProfilePicture,
            })
        }
    }

    return (
        <div className="profile-edit-page">
            <h1>Edit Profile</h1>

            <div className="header">
                <Link to="/me">
                    <span>&larr;&nbsp;Back to my profile</span>
                </Link>
            </div>

            <div className="content">
                <div className="left">
                    <h3>{player.displayName}</h3>

                    <PlayerImage imageSrc={player.profilePicture} />
                </div>

                <div className="details">
                    <Form className="profile-form" loading={isLoading} onSubmit={submit}>
                        <Form.Input
                            fluid
                            label="Display Name"
                            placeholder="Display Name"
                            id="form-input-display-name"
                            value={newDisplayName}
                            onChange={(e, data) => setNewDisplayName(data.value)}/>

                        <Form.Input
                            fluid
                            label="Profile Picture"
                            placeholder="Profile Picture"
                            id="form-input-profile-picture"
                            value={newProfilePicture}
                            onChange={(e, data) => setNewProfilePicture(data.value)}/>

                        <Form.Button fluid color="blue" disabled={!formComplete}>
                            Save Changes
                        </Form.Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
