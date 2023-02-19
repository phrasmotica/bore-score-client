import moment from "moment"
import { Form } from "semantic-ui-react"

import { dateValue, momentFromDate, momentFromTime, timeValue } from "../MomentHelpers"

interface DateTimeFormProps {
    timePlayed: moment.Moment
    setTimePlayed: (timePlayed: moment.Moment) => void
}

export const DateTimeForm = (props: DateTimeFormProps) => {
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
        <Form className="datetime-form">
            <Form.Group widths="equal" className="setting-container">
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
            </Form.Group>
        </Form>
    )
}
