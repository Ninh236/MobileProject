export function getDateWithHour(date: Date) {
  date.setHours(date.getHours())
  date.setMinutes(0, 0, 0)

  return date
}

export function getNextHourDate(date: Date) {
  date.setHours(date.getHours() + 1)
  date.setMinutes(0, 0, 0)

  return date
}
