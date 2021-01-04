import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(advancedFormat)

export function differenceInDays(
  laterDate: string | number | Date | dayjs.Dayjs | undefined,
  earlierDate: string | number | Date | dayjs.Dayjs | undefined
): number {
  const now = dayjs(new Date()).utc()

  if (!earlierDate) {
    return dayjs(laterDate)
      .utc()
      .diff(now, 'd')
  }

  return dayjs(laterDate)
    .utc()
    .diff(dayjs(earlierDate).utc(), 'd')
}
