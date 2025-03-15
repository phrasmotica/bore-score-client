import { useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { useAuth } from "react-oidc-context"
import { toast } from "react-semantic-toasts"
import { Button, ButtonGroup, Form, Header, Icon, Modal } from "semantic-ui-react"

import { GameImage } from "../GameImage"

import { usePlayers } from "../QueryHelpers"

import { GroupResponse } from "../models/Group"

import { InvitationStatus } from "../models/GroupMembership"
import { useAddGroupInvitation } from "../Mutations"

import "./InviteUsersModal.css"

interface InviteUsersModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    group: GroupResponse
}

export const InviteUsersModal = (props: InviteUsersModalProps) => {
    const queryClient = useQueryClient()

    const auth = useAuth()

    const username = auth.user?.profile.preferred_username || ""

    // TODO: don't load all players in one go
    const { data: allUsers } = usePlayers()
    const { data: usersInGroup } = usePlayers(props.group.id)

    const { mutate: invite } = useAddGroupInvitation(queryClient,
        data => {
            toast({
                title: "",
                description: `You invited ${data.username} to ${props.group.displayName}!`,
                color: "green",
                icon: "users",
            })

            setInvitees([])
        },
        (error, variables) => {
            toast({
                title: "",
                description: `Failed to invite ${variables.username} to ${props.group.displayName}.`,
                color: "red",
                icon: "users",
            })
        })

    const [invitees, setInvitees] = useState<string[]>([])

    const members = (usersInGroup ?? []).map(m => m.username)

    const usersOptions = (allUsers ?? []).filter(p => !members.includes(p.username)).map(p => ({
        key: p.username,
        text: p.displayName,
        value: p.username,
    }))

    const formIsComplete = useMemo(
        () => invitees.length > 0 && !invitees.some(u => !usersOptions.map(p => p.value).includes(u)),
        [invitees, usersOptions]
    )

    const sendInvitations = () => {
        for (let invitee of invitees) {
            invite({
                // TODO: remove these top three properties, they are not required
                id: "",
                timeCreated: 0,
                invitationStatus: InvitationStatus.Sent,
                groupId: props.group.id,
                username: invitee,
                inviterUsername: username,
            })
        }
    }

    let imageSrc = props.group.profilePicture

    return (
        <Modal
            className="invite-users-modal"
            onClose={() => props.setOpen(false)}
            open={props.open}>
            <Header>
                <Icon name="users" />
                Invite Users
            </Header>
            <Modal.Content>
                <div className="invite-users-form">
                    <div className="left">
                        <GameImage imageSrc={imageSrc} />
                    </div>

                    <div className="right">
                        <Form>
                            <Form.Dropdown
                                className="users-picker"
                                search
                                selection
                                multiple
                                clearable
                                label="Users"
                                placeholder="Select users to invite..."
                                options={usersOptions}
                                value={invitees}
                                onChange={(e, { value }) => setInvitees(value as string[])} />

                            <ButtonGroup fluid widths={2}>
                                <Button
                                    color="green"
                                    disabled={!formIsComplete}
                                    onClick={sendInvitations}>
                                    <Icon name="checkmark" />
                                    Send Invitations
                                </Button>

                                <Button color="red" onClick={() => props.setOpen(false)}>
                                    <Icon name="remove" />
                                    Cancel
                                </Button>
                            </ButtonGroup>

                            {invitees.length > 0 && <p>
                                The <strong>{invitees.length}</strong> selected user(s) will receive an invitation to&nbsp;
                                <strong>{props.group.displayName}</strong>, which they may either accept or decline.
                            </p>}
                        </Form>
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    )
}
