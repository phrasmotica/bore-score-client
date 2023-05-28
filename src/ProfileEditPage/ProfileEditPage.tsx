import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form } from "semantic-ui-react"
import { useQueryClient } from "@tanstack/react-query"

import { parseToken } from "../Auth"
import { useTitle } from "../Hooks"
import { useUpdatePassword, useUpdateProfile } from "../Mutations"
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

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token, navigate])

    const updateProfileQuery = useUpdateProfile(() => {
        queryClient.invalidateQueries({
            queryKey: ["player", username],
        })
    })

    const updatePasswordQuery = useUpdatePassword(() => {
        setCurrentPassword("")
        setNewPassword("")
        setNewPasswordAgain("")
    })

    const [newDisplayName, setNewDisplayName] = useState("")
    const [newProfilePicture, setNewProfilePicture] = useState("")

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordAgain, setNewPasswordAgain] = useState("")

    useEffect(() => {
        if (player) {
            setNewDisplayName(player.displayName)
            setNewProfilePicture(player.profilePicture)
        }
    }, [player])

    const profileFormComplete = useMemo(
        () => (newProfilePicture.length > 0 && newProfilePicture !== player?.profilePicture)
            || (newDisplayName.length > 0 && newDisplayName !== player?.displayName),
        [newProfilePicture, newDisplayName, player])

    const passwordFormComplete = useMemo(
        () => currentPassword.length > 0 && newPassword.length > 0 && newPassword === newPasswordAgain,
        [currentPassword, newPassword, newPasswordAgain])

    if (!token || !player) {
        return null
    }

    const updateProfile = () => {
        if (profileFormComplete) {
            updateProfileQuery.mutate({
                // TODO: remove unnecessary fields
                id: "",
                username: username,
                timeCreated: 0,
                displayName: newDisplayName,
                profilePicture: newProfilePicture,
            })
        }
    }

    const updatePassword = () => {
        if (passwordFormComplete) {
            updatePasswordQuery.mutate({
                username: username,
                currentPassword: currentPassword,
                newPassword: newPassword,
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

                <div className="form-container">
                    <Form className="profile-form" loading={updateProfileQuery.isLoading} onSubmit={updateProfile}>
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

                        <Form.Button fluid color="blue" disabled={!profileFormComplete}>
                            Save Changes
                        </Form.Button>
                    </Form>
                </div>

                <div className="form-container">
                    <Form className="password-form" loading={updatePasswordQuery.isLoading} onSubmit={updatePassword}>
                        <Form.Input
                            fluid
                            type="password"
                            label="Current Password"
                            placeholder="Current Password"
                            id="form-input-current-password"
                            value={currentPassword}
                            onChange={(e, data) => setCurrentPassword(data.value)}/>

                        <Form.Input
                            fluid
                            type="password"
                            label="New Password"
                            placeholder="New Password"
                            id="form-input-new-password"
                            value={newPassword}
                            onChange={(e, data) => setNewPassword(data.value)}/>

                        <Form.Input
                            fluid
                            type="password"
                            label="Confirm New Password"
                            placeholder="Confirm New Password"
                            id="form-input-new-password-again"
                            value={newPasswordAgain}
                            onChange={(e, data) => setNewPasswordAgain(data.value)}/>

                        <Form.Button fluid color="yellow" disabled={!passwordFormComplete}>
                            Update Password
                        </Form.Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
