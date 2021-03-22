import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(advancedFormat)

export function differenceInDays(
  laterDate: string | number | Date | dayjs.Dayjs | undefined,
  earlierDate?: string | number | Date | dayjs.Dayjs
): number {
  const from = dayjs(earlierDate).startOf('d') ?? dayjs(new Date()).startOf('d')
  const dif = dayjs(laterDate)
    .endOf('d')
    .utc()
    .diff(dayjs(from).utc(), 'd')
  return dif
}

export function getDateFromNow(numberOfDays: number): Date {
  const today = dayjs(new Date()).startOf('d')
  const dateFromNow = dayjs(today).add(numberOfDays, 'd')
  return dateFromNow.toDate()
}
