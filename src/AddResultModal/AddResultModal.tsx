import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import moment from "moment"
import { toast } from "react-semantic-toasts"
import { Accordion, Button, Form, Header, Icon, Modal } from "semantic-ui-react"
import { v4 as newGuid } from "uuid"

import { GroupForm } from "./GroupForm"
import { CooperativeScoreForm } from "./CooperativeScoreForm"
import { CooperativeWinForm } from "./CooperativeWinForm"
import { DateTimeForm } from "./DateTimeForm"
import { IndividualScoreForm } from "./IndividualScoreForm"
import { IndividualWinForm } from "./IndividualWinForm"
import { GameImage } from "../GameImage"

import { postResult } from "../FetchHelpers"
import { submitValue } from "../MomentHelpers"
import { useGames, useGroupMemberships, useGroups, usePlayers } from "../QueryHelpers"

import { Game } from "../models/Game"
import { WinMethodName } from "../models/WinMethod"

import "./AddResultModal.css"
import { parseToken } from "../Auth"

interface AddResultModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    game?: string
    group?: string
}

export const AddResultModal = (props: AddResultModalProps) => {
    const queryClient = useQueryClient()

    const token = parseToken()
    const username = token?.username || ""

    const { data: games } = useGames()
    const { data: groups } = useGroups()
    const { data: memberships } = useGroupMemberships(username)

    // TODO: add error handling
    const { mutate: addResult } = useMutation({
        mutationFn: postResult,
        onSuccess: () => {
            props.setOpen(false)

            toast({
                title: "",
                description: `Result for ${game!.displayName} added successfully.`,
                color: "green",
                icon: "check circle outline",
            })

            queryClient.invalidateQueries({
                queryKey: ["results"]
            })
        },
    })

    const [showPlayers, setShowPlayers] = useState(true)
    const [showGroup, setShowGroup] = useState(false)
    const [showNotes, setShowNotes] = useState(false)

    const [game, setGame] = useState<Game>()
    const [useGroup, setUseGroup] = useState(false)
    const [group, setGroup] = useState("")
    const [timePlayed, setTimePlayed] = useState(moment())
    const [notes, setNotes] = useState("")

    const [formData, setFormData] = useState<any>()
    const [formIsComplete, setFormIsComplete] = useState(false)

    const { data: players } = usePlayers(useGroup ? group : "")

    useEffect(() => {
        if (games && games.length > 0) {
            let defaultGame = games.find(g => g.name === props.game) ?? games[0]
            setGame(defaultGame)
        }
    }, [games, props.game])

    useEffect(() => {
        if (groups && groups.length > 0) {
            let groupFromParam = groups.find(g => g.name === props.group)
            let defaultGroup = groupFromParam ?? groups[0]
            setGroup(defaultGroup.name)

            if (groupFromParam !== undefined) {
                setUseGroup(true)
                setShowGroup(true)
            }
        }
    }, [groups, props.group])

    useEffect(() => {
        if (props.open) {
            setTimePlayed(moment())
        }
    }, [props.open])

    let groupsToShow = (groups ?? []).filter(g => (memberships ?? []).some(m => m.groupId === g.id))

    const updateFormData = (isComplete: boolean, formData: any) => {
        setFormIsComplete(isComplete)
        setFormData(formData)
    }

    const renderGameForm = () => {
        switch (game?.winMethod) {
            case WinMethodName.IndividualScore:
                return (
                    <IndividualScoreForm
                        players={players ?? []}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.IndividualWin:
                return (
                    <IndividualWinForm
                        players={players ?? []}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.CooperativeScore:
                return (
                    <CooperativeScoreForm
                        players={players ?? []}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )

            case WinMethodName.CooperativeWin:
                return (
                    <CooperativeWinForm
                        players={players ?? []}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        updateFormData={updateFormData} />
                )
        }

        return null
    }

    const submit = () => {
        if (game === undefined) {
            return
        }

        addResult({
            id: newGuid(),
            timeCreated: moment().unix(),
            gameName: game.name,
            groupName: useGroup ? group : "",
            timePlayed: submitValue(timePlayed),
            notes: notes,
            ...formData
        })
    }

    let imageSrc = game?.imageLink

    let gameOptions = (games ?? []).map(g => ({
        key: g.name,
        text: g.displayName,
        value: g.name,
    }))

    const setSelectedGame = (name: string) => {
        let game = games?.find(g => g.name === name)
        setGame(game)
    }

    return (
        <Modal
            className="add-result-modal"
            onClose={() => props.setOpen(false)}
            open={props.open}>
            <Header>
                <Icon name="edit" />
                Add Result
            </Header>
            <Modal.Content>
                <div className="add-result-form">
                    <div className="game">
                        <div className="form-header">
                            <Form>
                                <Form.Dropdown
                                    className="game-picker"
                                    search
                                    selection
                                    label="Game"
                                    placeholder="Select game..."
                                    options={gameOptions}
                                    value={game?.name ?? ""}
                                    onChange={(e, { value }) => setSelectedGame(String(value))} />
                            </Form>
                        </div>

                        <GameImage imageSrc={imageSrc || ""} />
                    </div>

                    <div className="details">
                        <div className="form-header">
                            <DateTimeForm
                                timePlayed={timePlayed}
                                setTimePlayed={setTimePlayed} />
                        </div>

                        <Accordion styled fluid>
                            <Accordion.Title active={showPlayers} onClick={() => setShowPlayers(s => !s)}>
                                <h3>Players</h3>

                                <Icon name="chevron left" />
                            </Accordion.Title>
                            <Accordion.Content active={showPlayers}>
                                {renderGameForm()}
                            </Accordion.Content>

                            <Accordion.Title active={showGroup} onClick={() => setShowGroup(s => !s)}>
                                <h3>Group</h3>

                                <Icon name="chevron left" />
                            </Accordion.Title>
                            <Accordion.Content active={showGroup}>
                                <GroupForm
                                    groups={groupsToShow}
                                    useGroup={useGroup}
                                    setUseGroup={setUseGroup}
                                    group={group}
                                    setGroup={setGroup} />
                            </Accordion.Content>

                            <Accordion.Title active={showNotes} onClick={() => setShowNotes(s => !s)}>
                                <h3>Notes</h3>

                                <Icon name="chevron left" />
                            </Accordion.Title>
                            <Accordion.Content active={showNotes}>
                                <Form>
                                    <Form.TextArea
                                        className="notes-input"
                                        placeholder="Notes"
                                        value={notes}
                                        onChange={(e, { value }) => setNotes(String(value))} />
                                </Form>
                            </Accordion.Content>
                        </Accordion>
                    </div>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="green"
                    disabled={!formIsComplete}
                    onClick={submit}>
                    <Icon name="checkmark" />
                    Submit
                </Button>

                <Button color="red" onClick={() => props.setOpen(false)}>
                    <Icon name="remove" />
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
