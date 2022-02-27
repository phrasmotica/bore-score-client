import moment from "moment"
import { Form } from "semantic-ui-react"

import { dateValue, momentFromDate, momentFromTime, timeValue } from "../MomentHelpers"

import { Game } from "../models/Game"

interface CommonFormProps {
    games: Game[]
    selectedGame: Game | undefined
    setSelectedGame: (id: Game | undefined) => void
    timestamp: moment.Moment
    setTimestamp: (timestamp: moment.Moment) => void
    notes: string
    setNotes: (notes: string) => void
}

export const CommonForm = (props: CommonFormProps) => {
    let gameOptions = props.games.map(g => ({
        key: g.name,
        text: g.displayName,
        value: g.name,
    }))

    const setSelectedGame = (name: string) => {
        let game = props.games.find(g => g.name === name)
        props.setSelectedGame(game)
    }

    const setNewDate = (input: string) => {
        let newDate = momentFromDate(input)

        let newTimestamp = props.timestamp
            .clone()
            .year(newDate.year())
            .month(newDate.month())
            .date(newDate.date())

        props.setTimestamp(newTimestamp)
    }

    const setNewTime = (input: string) => {
        let newTime = momentFromTime(input)

        let newTimestamp = props.timestamp
            .clone()
            .hour(newTime.hour())
            .minute(newTime.minute())

        props.setTimestamp(newTimestamp)
    }

    return (
        <Form className="common-form">
            <Form.Group>
                <Form.Dropdown
                    className="game-picker"
                    search
                    selection
                    label="Game"
                    placeholder="Select game..."
                    options={gameOptions}
                    value={props.selectedGame?.name ?? ""}
                    onChange={(e, { value }) => setSelectedGame(String(value))} />

                <Form.Input
                    type="date"
                    label="Date"
                    value={dateValue(props.timestamp)}
                    onChange={(e, { value }) => setNewDate(value)} />

                <Form.Input
                    type="time"
                    label="Time"
                    value={timeValue(props.timestamp)}
                    onChange={(e, { value }) => setNewTime(value)} />
            </Form.Group>

            <Form.Group>
                <Form.TextArea
                    className="notes-input"
                    label="Notes"
                    placeholder="Notes"
                    value={props.notes}
                    onChange={(e, { value }) => props.setNotes(String(value))} />
            </Form.Group>
        </Form>
    )
}
