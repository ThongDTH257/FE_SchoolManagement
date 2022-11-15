import moment from "moment"
import { useEffect, useRef } from "react"

const getRangeDateByWeek = (year: number, isoweek: number, formatter?: string) => {
    const date = moment().isoWeekYear(year).isoWeek(isoweek)
    return [
        date.startOf("isoweek").format(formatter ?? 'YYYY-MM-DD'),
        date.add('days', 6).format(formatter ?? 'YYYY-MM-DD'),
    ]
}
const getCurrentWeek = () => moment().isoWeek()

export { getRangeDateByWeek, getCurrentWeek }