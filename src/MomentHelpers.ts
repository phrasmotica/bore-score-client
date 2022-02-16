import moment from "moment"

const DATE_FORMAT = "YYYY-MM-DD"
const TIME_FORMAT = "HH:mm"
const DISPLAY_FORMAT = "DD/MM/YYYY HH:mm"

export const dateValue = (moment: moment.Moment) => moment.format(DATE_FORMAT)
export const timeValue = (moment: moment.Moment) => moment.format(TIME_FORMAT)
export const submitValue = (moment: moment.Moment) => moment.unix()
export const displayDateTimeValue = (moment: moment.Moment) => moment.format(DISPLAY_FORMAT)
