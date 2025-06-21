import { useState } from 'react'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  CalendarIcon,
  ArrowsRightLeftIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'
import { holidays, monthNames as thirteenMonthNames } from '../utils/calendarData'
import { gregorianTo13Month, thirteenMonthToGregorian } from '../utils/dateConversion'

const gregorianMonthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const getDaysInGregorianMonth = (month, year) => {
  return new Date(year, month, 0).getDate()
}

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month - 1, 1).getDay()
}

function GregorianCalendar({ theme, selectedMonth, selectedYear, setSelectedMonth, setSelectedYear, onModeSwitch, setTheme }) {
  const [hoveredDate, setHoveredDate] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  
  const isDark = theme === 'dark' || theme === 'blackice'
  const isBlackIce = theme === 'blackice'
  
  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()
  const currentDay = today.getDate()

  const navigateMonth = (direction) => {
    setSelectedDate(null)
    if (direction === 'prev') {
      if (selectedMonth === 1) {
        setSelectedMonth(12)
        setSelectedYear(selectedYear - 1)
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    } else {
      if (selectedMonth === 12) {
        setSelectedMonth(1)
        setSelectedYear(selectedYear + 1)
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    }
  }

  const daysInMonth = getDaysInGregorianMonth(selectedMonth, selectedYear)
  const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear)
  
  // Get holidays for this Gregorian month by converting each day to 13-month calendar
  const getHolidayForGregorianDate = (year, month, day) => {
    try {
      const gregorianDate = new Date(year, month - 1, day)
      const thirteenMonthDate = gregorianTo13Month(gregorianDate)
      const monthHolidays = holidays[thirteenMonthDate.month]
      if (monthHolidays && monthHolidays[thirteenMonthDate.day]) {
        return {
          ...monthHolidays[thirteenMonthDate.day],
          thirteenMonthDate
        }
      }
    } catch (e) {
      // Invalid date conversions are ignored
    }
    return null
  }

  const renderDay = (dayNum, index) => {
    if (dayNum === 0) {
      return <div key={`empty-${Math.random()}`} className="aspect-square" />
    }
    
    const holiday = getHolidayForGregorianDate(selectedYear, selectedMonth, dayNum)
    const Icon = holiday?.icon
    
    const isToday = currentYear === selectedYear && currentMonth === selectedMonth && currentDay === dayNum
    const isSelected = selectedDate && 
      selectedDate.year === selectedYear && 
      selectedDate.month === selectedMonth && 
      selectedDate.day === dayNum

    const handleClick = () => {
      setSelectedDate({
        year: selectedYear,
        month: selectedMonth,
        day: dayNum
      })
    }
    
    // Determine tooltip position based on day position
    const dayOfWeek = index % 7
    const isLeftEdge = dayOfWeek < 2
    const isRightEdge = dayOfWeek > 4

    return (
      <div 
        key={dayNum} 
        className={`
          aspect-square flex flex-col items-center justify-center 
          backdrop-blur-md rounded-xl transition-all duration-300 cursor-pointer relative group
          ${isBlackIce ? (
            isToday ? 'bg-gradient-to-br from-cyan-400/30 to-blue-400/30 border-2 border-cyan-400/40 shadow-lg shadow-cyan-500/20' : 
            isSelected ? 'bg-gradient-to-br from-emerald-400/30 to-teal-400/30 border-2 border-emerald-400/40 shadow-lg shadow-emerald-500/20' :
            'bg-slate-800/40 border border-cyan-500/10 hover:bg-slate-700/50 hover:border-cyan-400/20 hover:shadow-lg hover:shadow-cyan-500/10'
          ) : isDark ? (
            isToday ? 'bg-gradient-to-br from-blue-400/40 to-cyan-400/40 border-2 border-blue-300/50 shadow-lg shadow-blue-500/25' : 
            isSelected ? 'bg-gradient-to-br from-green-400/40 to-emerald-400/40 border-2 border-green-300/50 shadow-lg shadow-green-500/25' :
            'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10'
          ) : (
            isToday ? 'bg-gradient-to-br from-blue-500/50 to-cyan-500/50 border-2 border-blue-400/70 shadow-lg shadow-blue-500/30' : 
            isSelected ? 'bg-gradient-to-br from-green-500/50 to-emerald-500/50 border-2 border-green-400/70 shadow-lg shadow-green-500/30' :
            'bg-white/60 border border-gray-300/50 hover:bg-white/80 hover:border-gray-400/60 hover:shadow-lg'
          )}
        `}
        onClick={handleClick}
        onMouseEnter={() => holiday && setHoveredDate({ day: dayNum, holiday })}
        onMouseLeave={() => setHoveredDate(null)}
      >
        <span className={`text-lg font-medium transition-all duration-300 ${
          isBlackIce ? (
            isToday ? 'text-cyan-100 font-bold drop-shadow-lg' : 
            isSelected ? 'text-emerald-100 font-bold drop-shadow-lg' : 
            'text-cyan-200/90 group-hover:text-cyan-100 group-hover:scale-110'
          ) : isDark ? (
            isToday ? 'text-white font-bold drop-shadow-lg' : 
            isSelected ? 'text-white font-bold drop-shadow-lg' : 
            'text-white/90 group-hover:text-white group-hover:scale-110'
          ) : (
            isToday ? 'text-white font-bold drop-shadow' : 
            isSelected ? 'text-white font-bold drop-shadow' : 
            'text-gray-700 group-hover:text-gray-900 group-hover:scale-110'
          )
        }`}>
          {dayNum}
        </span>
        {Icon && (
          <Icon className={`w-5 h-5 absolute bottom-2 drop-shadow-lg transition-all duration-300 group-hover:scale-110 ${
            isBlackIce 
              ? (isToday || isSelected ? 'text-cyan-200/90' : 'text-cyan-300/80')
              : isDark 
              ? (isToday || isSelected ? 'text-white/90' : holiday.color.replace('text-', 'text-white/90'))
              : (isToday || isSelected ? 'text-white/90' : holiday.color)
          }`} />
        )}
        
        {hoveredDate?.day === dayNum && (
          <div className={`absolute z-20 bottom-full mb-3 px-4 py-3 backdrop-blur-xl bg-black/70 text-white text-sm rounded-xl whitespace-nowrap border border-white/20 shadow-xl ${
            isLeftEdge ? 'left-0' : isRightEdge ? 'right-0' : 'left-1/2 transform -translate-x-1/2'
          }`}>
            <div className="font-bold text-white">{holiday.name}</div>
            <div className="text-white/80 text-xs mt-1">{holiday.description}</div>
            <div className="text-white/60 text-xs mt-1">
              {thirteenMonthNames[holiday.thirteenMonthDate.month - 1]} {holiday.thirteenMonthDate.day}
            </div>
            <div className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/70 ${
              isLeftEdge ? 'left-4' : isRightEdge ? 'right-4' : 'left-1/2 transform -translate-x-1/2'
            }`}></div>
          </div>
        )}
      </div>
    )
  }

  // Create calendar grid
  const calendarDays = []
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(renderDay(0, i))
  }
  
  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(renderDay(i, firstDayOfMonth + i - 1))
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigateMonth('prev')}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 border shadow-lg group ${
            isBlackIce
              ? 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20'
              : isDark
              ? 'bg-white/10 hover:bg-white/20 border-white/20'
              : 'bg-white/50 hover:bg-white/70 border-white/60'
          }`}
        >
          <ChevronLeftIcon className={`w-6 h-6 group-hover:scale-110 transition-transform ${
            isBlackIce ? 'text-cyan-300' : isDark ? 'text-white' : 'text-gray-700'
          }`} />
        </button>
        
        <div className="text-center flex-1">
          <div className="flex items-center justify-center gap-3">
            <h2 className={`text-3xl font-bold flex items-center justify-center gap-3 drop-shadow-lg ${
              isBlackIce ? 'text-cyan-100' : isDark ? 'text-white' : 'text-gray-800'
            }`}>
              <CalendarIcon className={`w-8 h-8 ${
                isBlackIce ? 'text-cyan-400' : isDark ? 'text-purple-300' : 'text-purple-600'
              }`} />
              {gregorianMonthNames[selectedMonth - 1]} {selectedYear}
            </h2>
            
            {/* Calendar Mode Toggle Button */}
            <button
              onClick={onModeSwitch}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 border shadow-lg group ml-4 ${
                isBlackIce
                  ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/30'
                  : isDark
                  ? 'bg-indigo-400/20 hover:bg-indigo-400/30 border-indigo-400/30'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 border-indigo-600/30'
              }`}
              title="Switch to 13-Month Calendar"
            >
              <ArrowsRightLeftIcon className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                isBlackIce ? 'text-cyan-400' : isDark ? 'text-indigo-300' : 'text-indigo-700'
              }`} />
            </button>
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                if (theme === 'light') setTheme('dark')
                else if (theme === 'dark') setTheme('blackice')
                else setTheme('light')
              }}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 border shadow-lg group ml-2 ${
                theme === 'blackice'
                  ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/30'
                  : theme === 'dark'
                  ? 'bg-yellow-400/20 hover:bg-yellow-400/30 border-yellow-400/30'
                  : 'bg-purple-600/20 hover:bg-purple-600/30 border-purple-600/30'
              }`}
              title={
                theme === 'blackice' ? "Switch to Light Mode" : 
                theme === 'dark' ? "Switch to Black Ice Mode" : 
                "Switch to Dark Mode"
              }
            >
              {theme === 'blackice' ? (
                <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8a4 4 0 100 8 4 4 0 000-8z" opacity="0.3" />
                </svg>
              ) : theme === 'dark' ? (
                <SunIcon className="w-5 h-5 text-yellow-300 group-hover:scale-110 transition-transform" />
              ) : (
                <MoonIcon className="w-5 h-5 text-purple-700 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
          
          <p className={`text-sm mt-2 ${
            isBlackIce ? 'text-cyan-200/70' : isDark ? 'text-white/70' : 'text-gray-600'
          }`}>
            Gregorian Calendar
          </p>
          
          {(selectedMonth !== currentMonth || selectedYear !== currentYear) && (
            <button
              onClick={() => {
                setSelectedMonth(currentMonth)
                setSelectedYear(currentYear)
              }}
              className={`mt-3 text-sm backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border shadow-lg ${
                isBlackIce
                  ? 'bg-gradient-to-r from-cyan-500/40 to-blue-500/40 text-cyan-100 hover:from-cyan-500/60 hover:to-blue-500/60 border-cyan-500/30'
                  : isDark
                  ? 'bg-gradient-to-r from-purple-500/50 to-blue-500/50 text-white hover:from-purple-500/70 hover:to-blue-500/70 border-white/20'
                  : 'bg-gradient-to-r from-purple-500/60 to-blue-500/60 text-white hover:from-purple-600/70 hover:to-blue-600/70 border-purple-300/30'
              }`}
            >
              Go to Today
            </button>
          )}
        </div>
        
        <button 
          onClick={() => navigateMonth('next')}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 border shadow-lg group ${
            isBlackIce
              ? 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20'
              : isDark
              ? 'bg-white/10 hover:bg-white/20 border-white/20'
              : 'bg-white/50 hover:bg-white/70 border-white/60'
          }`}
        >
          <ChevronRightIcon className={`w-6 h-6 group-hover:scale-110 transition-transform ${
            isBlackIce ? 'text-cyan-300' : isDark ? 'text-white' : 'text-gray-700'
          }`} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={`text-center font-semibold text-sm py-3 ${
            isBlackIce ? 'text-cyan-300/70' : isDark ? 'text-white/70' : 'text-gray-700'
          }`}>
            {day}
          </div>
        ))}
        
        {calendarDays}
      </div>

      <div className={`mt-6 text-center text-sm backdrop-blur-md rounded-xl p-5 border ${
        isBlackIce
          ? 'bg-slate-900/30 border-cyan-500/20'
          : isDark 
          ? 'bg-white/5 border-white/10' 
          : 'bg-white/40 border-gray-300/30'
      }`}>
        <p className={isBlackIce ? 'text-cyan-100' : isDark ? 'text-white/90' : 'text-gray-800'}>
          Today: <span className={`font-bold ${isBlackIce ? 'text-cyan-400' : isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
            {gregorianMonthNames[currentMonth - 1]} {currentDay}, {currentYear}
          </span>
        </p>
        <p className={`text-xs mt-1 ${isBlackIce ? 'text-cyan-200/60' : isDark ? 'text-white/60' : 'text-gray-600'}`}>
          13-Month: {(() => {
            const thirteenMonth = gregorianTo13Month(today)
            return `${thirteenMonthNames[thirteenMonth.month - 1]} ${thirteenMonth.day}, ${thirteenMonth.year}${
              thirteenMonth.isNewYearsDay ? " (New Year's Day)" : 
              thirteenMonth.isNewYearsLeap ? " (New Year's Leap)" : ""
            }`
          })()}
        </p>
        
        {selectedDate && (
          <div className={`mt-4 pt-4 border-t ${isBlackIce ? 'border-cyan-500/20' : isDark ? 'border-white/20' : 'border-gray-300/30'}`}>
            <p className={isBlackIce ? 'text-cyan-100' : isDark ? 'text-white/90' : 'text-gray-800'}>
              Selected: <span className={`font-bold ${isBlackIce ? 'text-emerald-400' : isDark ? 'text-green-300' : 'text-green-600'}`}>
                {gregorianMonthNames[selectedDate.month - 1]} {selectedDate.day}, {selectedDate.year}
              </span>
            </p>
            <p className={`text-xs mt-1 ${isBlackIce ? 'text-cyan-200/60' : isDark ? 'text-white/60' : 'text-gray-600'}`}>
              13-Month: {(() => {
                try {
                  const gregorianDate = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)
                  const thirteenMonth = gregorianTo13Month(gregorianDate)
                  return `${thirteenMonthNames[thirteenMonth.month - 1]} ${thirteenMonth.day}, ${thirteenMonth.year}${
                    thirteenMonth.isNewYearsDay ? " (New Year's Day)" : 
                    thirteenMonth.isNewYearsLeap ? " (New Year's Leap)" : ""
                  }`
                } catch (e) {
                  return 'Invalid date'
                }
              })()}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default GregorianCalendar