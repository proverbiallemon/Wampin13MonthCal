import { useMemo } from 'react'
import { gregorianTo13Month } from '../utils/dateConversion'
import { monthNames } from '../utils/calendarData'

const gregorianMonthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

/**
 * Build a Map<"year-month-day", Event[]> for 13-month calendar lookups.
 * Multi-day events are iterated day-by-day through their Gregorian range,
 * converting each day to 13-month coordinates.
 */
export function useEventLookup(googleEvents) {
  return useMemo(() => {
    const map = new Map()
    if (!googleEvents?.length) return map

    for (const event of googleEvents) {
      if (!event.gregorianStart || !event.gregorianEnd) continue

      const startMs = event.gregorianStart.getTime()
      const endMs = event.gregorianEnd.getTime()
      const dayMs = 24 * 60 * 60 * 1000

      for (let ms = startMs; ms <= endMs; ms += dayMs) {
        try {
          const date = new Date(ms)
          const tm = gregorianTo13Month(date)
          const key = `${tm.year}-${tm.month}-${tm.day}`
          if (!map.has(key)) map.set(key, [])
          map.get(key).push(event)
        } catch {
          // skip invalid conversions
        }
      }
    }

    return map
  }, [googleEvents])
}

/**
 * Build a Map<"year-month-day", Event[]> for Gregorian calendar lookups.
 * Multi-day events are iterated day-by-day through their Gregorian range.
 */
export function useGregorianEventLookup(googleEvents) {
  return useMemo(() => {
    const map = new Map()
    if (!googleEvents?.length) return map

    for (const event of googleEvents) {
      if (!event.gregorianStart || !event.gregorianEnd) continue

      const startMs = event.gregorianStart.getTime()
      const endMs = event.gregorianEnd.getTime()
      const dayMs = 24 * 60 * 60 * 1000

      for (let ms = startMs; ms <= endMs; ms += dayMs) {
        const date = new Date(ms)
        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        if (!map.has(key)) map.set(key, [])
        map.get(key).push(event)
      }
    }

    return map
  }, [googleEvents])
}

/** Simple O(1) lookup from the precomputed map */
export function getEventsForDay(map, year, month, day) {
  return map.get(`${year}-${month}-${day}`) || []
}

/** Returns "All day" or formatted time string like "2:30 PM" */
export function getEventTimeDisplay(event) {
  if (event.allDay) return 'All day'
  try {
    return event.gregorianStart.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  } catch {
    return ''
  }
}

/** Format Gregorian + 13-month date range for modal display */
export function formatEventDateRange(event) {
  const gregStart = event.gregorianStart
  const gregEnd = event.gregorianEnd
  const tmStart = event.thirteenMonthStart
  const tmEnd = event.thirteenMonthEnd

  const gregOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  const gregStartStr = gregStart.toLocaleDateString('en-US', gregOpts)
  const gregEndStr = gregEnd.toLocaleDateString('en-US', gregOpts)
  const isSameDay = gregStart.toDateString() === gregEnd.toDateString()

  const gregorian = isSameDay ? gregStartStr : `${gregStartStr} — ${gregEndStr}`

  const tmStartStr = `${monthNames[tmStart.month - 1]} ${tmStart.day}, ${tmStart.year}`
  const tmEndStr = `${monthNames[tmEnd.month - 1]} ${tmEnd.day}, ${tmEnd.year}`
  const tmSameDay = tmStart.year === tmEnd.year && tmStart.month === tmEnd.month && tmStart.day === tmEnd.day

  const thirteenMonth = tmSameDay ? tmStartStr : `${tmStartStr} — ${tmEndStr}`

  return { gregorian, thirteenMonth }
}

/** Get upcoming events sorted by start date */
export function getUpcomingEvents(googleEvents, limit = 20) {
  const now = new Date()
  return googleEvents
    .filter(e => e.gregorianEnd >= now)
    .sort((a, b) => a.gregorianStart - b.gregorianStart)
    .slice(0, limit)
}

/** Short 13-month date for agenda rows, e.g. "Mar 15" */
export function getShort13MonthDate(event) {
  const tm = event.thirteenMonthStart
  const shortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Yul']
  return `${shortNames[tm.month - 1]} ${tm.day}`
}
