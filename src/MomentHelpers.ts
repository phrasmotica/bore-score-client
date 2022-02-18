import moment from "moment"

const DATE_FORMAT = "YYYY-MM-DD"
const TIME_FORMAT = "HH:mm"

const DATE_DISPLAY_FORMAT = "DD/MM/YYYY"
const TIME_DISPLAY_FORMAT = "HH:mm"

export const dateValue = (moment: moment.Moment) => moment.format(DATE_FORMAT)
export const timeValue = (moment: moment.Moment) => moment.format(TIME_FORMAT)
export const submitValue = (moment: moment.Moment) => moment.unix()

export const momentFromDate = (dateStr: string) => moment(dateStr, DATE_FORMAT)
export const momentFromTime = (timeStr: string) => moment(timeStr, TIME_FORMAT)

export const displayDateTimeValue = (moment: moment.Moment) => moment.format(DATE_DISPLAY_FORMAT + " " + TIME_DISPLAY_FORMAT)
export const displayDateValue = (moment: moment.Moment) => moment.format(DATE_DISPLAY_FORMAT)
