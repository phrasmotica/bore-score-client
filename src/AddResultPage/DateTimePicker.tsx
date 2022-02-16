import moment from "moment"
import { Form } from "semantic-ui-react"

import { dateValue, timeValue } from "../MomentHelpers"

interface DateTimePickerProps {
    dateTime: moment.Moment
    setDateTime: (dateTime: moment.Moment) => void
}

export const DateTimePicker = (props: DateTimePickerProps) => {
    return (
        <Form>
            <Form.Group>
                <Form.Input type="date" label="Date" value={dateValue(props.dateTime)} />
                <Form.Input type="time" label="Time" value={timeValue(props.dateTime)} />
            </Form.Group>
        </Form>
    )
}
