// Date conversion utilities between Gregorian and 13-month calendar

import { isLeapYear } from './calendarData'

// Get day of year (1-366) from a Gregorian date
export const getDayOfYear = (date) => {
  const year = date.getFullYear()
  const startOfYear = new Date(year, 0, 1)
  const diffInMs = date - startOfYear
  const dayOfYear = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1
  return dayOfYear
}

// Convert Gregorian date to 13-month calendar format
export const gregorianTo13Month = (gregorianDate) => {
  const year = gregorianDate.getFullYear()
  const dayOfYear = getDayOfYear(gregorianDate)
  
  // Each of the first 13 months has 28 days
  // Total regular days: 13 * 28 = 364
  // Day 365 is New Year's Day (13-29)
  // Day 366 (leap years only) is New Year's Leap (13-30)
  
  if (dayOfYear <= 364) {
    // Regular days in months 1-13
    const month = Math.ceil(dayOfYear / 28)
    const dayInMonth = ((dayOfYear - 1) % 28) + 1
    
    return {
      year,
      month,
      day: dayInMonth,
      isNewYearsDay: false,
      isNewYearsLeap: false
    }
  } else if (dayOfYear === 365) {
    // New Year's Day
    return {
      year,
      month: 13,
      day: 29,
      isNewYearsDay: true,
      isNewYearsLeap: false
    }
  } else if (dayOfYear === 366 && isLeapYear(year)) {
    // New Year's Leap
    return {
      year,
      month: 13,
      day: 30,
      isNewYearsDay: false,
      isNewYearsLeap: true
    }
  }
  
  // Should not reach here
  throw new Error('Invalid date')
}

// Convert 13-month calendar date to Gregorian
export const thirteenMonthToGregorian = (year, month, day) => {
  if (month < 1 || month > 13) {
    throw new Error('Invalid month')
  }
  
  if (month <= 12 && (day < 1 || day > 28)) {
    throw new Error('Invalid day for regular month')
  }
  
  if (month === 13) {
    if (day < 1 || day > 30) {
      throw new Error('Invalid day for Yule')
    }
    if (day === 30 && !isLeapYear(year)) {
      throw new Error('Day 30 only exists in leap years')
    }
  }
  
  let dayOfYear
  
  if (month <= 13 && day <= 28) {
    // Regular days
    dayOfYear = (month - 1) * 28 + day
  } else if (month === 13 && day === 29) {
    // New Year's Day
    dayOfYear = 365
  } else if (month === 13 && day === 30) {
    // New Year's Leap
    dayOfYear = 366
  }
  
  // Create date from day of year
  const date = new Date(year, 0, 1) // January 1st
  date.setDate(dayOfYear)
  
  return date
}

// Get current date in 13-month calendar format
export const getCurrentDate13Month = () => {
  const today = new Date()
  return gregorianTo13Month(today)
}

// Check if two 13-month dates are the same
export const isSameDate13Month = (date1, date2) => {
  return date1.year === date2.year && 
         date1.month === date2.month && 
         date1.day === date2.day
}