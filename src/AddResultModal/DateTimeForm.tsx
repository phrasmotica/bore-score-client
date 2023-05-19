import moment from "moment"
import { Form } from "semantic-ui-react"
import { v4 as newGuid } from "uuid"

import { dateValue, momentFromDate, momentFromTime, timeValue } from "../MomentHelpers"

interface DateTimeFormProps {
    timePlayed: moment.Moment
    setTimePlayed: (timePlayed: moment.Moment) => void
    dateLabel?: string
    timeLabel?: string
    disabled?: boolean
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

    let guid = newGuid()

    let dateLabel = <label htmlFor={"date-" + guid}>&nbsp;</label>
    if (props.dateLabel) {
        dateLabel = <label htmlFor={"date-" + guid}>{props.dateLabel}</label>
    }

    let timeLabel = <label htmlFor={"time-" + guid}>&nbsp;</label>
    if (props.timeLabel) {
        timeLabel = <label htmlFor={"time-" + guid}>{props.timeLabel}</label>
    }

    return (
        <Form className="datetime-form">
            <Form.Group className="setting-container unstackable">
                <Form.Input
                    id={"date-" + guid}
                    width={9}
                    type="date"
                    label={dateLabel}
                    value={dateValue(props.timePlayed)}
                    onChange={(e, { value }) => setNewDate(value)}
                    disabled={props.disabled} />

                <Form.Input
                    id={"time-" + guid}
                    width={7}
                    type="time"
                    label={timeLabel}
                    value={timeValue(props.timePlayed)}
                    onChange={(e, { value }) => setNewTime(value)}
                    disabled={props.disabled} />
            </Form.Group>
        </Form>
    )
}
