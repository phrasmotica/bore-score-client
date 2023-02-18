import moment from "moment"
import { Form, Icon } from "semantic-ui-react"

import { NoAttachedGroupWarning } from "./NoAttachedGroupWarning"

import { dateValue, momentFromDate, momentFromTime, timeValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { Group } from "../models/Group"

interface CommonFormProps {
    games: Game[]
    groups: Group[]
    selectedGame: Game | undefined
    setSelectedGame: (id: Game | undefined) => void
    useGroup: boolean
    setUseGroup: (useGroup: boolean) => void
    group: string
    setGroup: (group: string) => void
    timePlayed: moment.Moment
    setTimePlayed: (timePlayed: moment.Moment) => void
    notes: string
    setNotes: (notes: string) => void
    formIsComplete: boolean
    submit: () => void
}

export const CommonForm = (props: CommonFormProps) => {
    let groupOptions = props.groups.map(gr => ({
        key: gr.name,
        text: `${gr.displayName} (${gr.type})`,
        value: gr.name,
    }))

    const setNewDate = (input: string) => {
        let newDate = momentFromDate(input)

        let newTimestamp = props.timePlayed
            .clone()
            .year(newDate.year())
            .month(newDate.month())
            .date(newDate.date())

        props.setTimePlayed(newTimestamp)
    }

    const setNewTime = (input: string) => {
        let newTime = momentFromTime(input)

        let newTimestamp = props.timePlayed
            .clone()
            .hour(newTime.hour())
            .minute(newTime.minute())

        props.setTimePlayed(newTimestamp)
    }

    return (
        <Form className="common-form" onSubmit={props.submit}>
            <Form.Button
                icon
                fluid
                className="submit-button"
                color="teal"
                disabled={!props.formIsComplete}>
                <span>Submit&nbsp;</span>
                <Icon name="check" />
            </Form.Button>

            <Form.Group className="setting-container">
                <Form.Input
                    type="date"
                    label="Date"
                    value={dateValue(props.timePlayed)}
                    onChange={(e, { value }) => setNewDate(value)} />

                <Form.Input
                    type="time"
                    label="Time"
                    value={timeValue(props.timePlayed)}
                    onChange={(e, { value }) => setNewTime(value)} />

                <Form.Checkbox
                    label="Attach to a group?"
                    checked={props.useGroup}
                    onChange={(e, { checked }) => props.setUseGroup(checked ?? false)} />

                <Form.Dropdown
                    className="group-picker"
                    search
                    selection
                    label="Group"
                    placeholder="Select group..."
                    options={groupOptions}
                    value={props.group}
                    disabled={!props.useGroup}
                    onChange={(e, { value }) => props.setGroup(String(value))} />
            </Form.Group>

            {!props.useGroup && <NoAttachedGroupWarning />}

            <Form.TextArea
                className="notes-input"
                label="Notes"
                placeholder="Notes"
                value={props.notes}
                onChange={(e, { value }) => props.setNotes(String(value))} />
        </Form>
    )
}
