import { useState, useEffect } from 'react'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  CalendarIcon,
  SunIcon,
  MoonIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline'
import { monthNames, holidays, getDaysInMonth } from '../utils/calendarData'
import { getCurrentDate13Month, isSameDate13Month, thirteenMonthToGregorian, gregorianTo13Month } from '../utils/dateConversion'
import GregorianCalendar from './GregorianCalendar'

function Calendar({ theme, setTheme }) {
  const currentDate13Month = getCurrentDate13Month()
  const today = new Date()
  
  // State for 13-month calendar
  const [selectedMonth13, setSelectedMonth13] = useState(currentDate13Month.month)
  const [selectedYear13, setSelectedYear13] = useState(currentDate13Month.year)
  
  // State for Gregorian calendar
  const [selectedMonthGreg, setSelectedMonthGreg] = useState(today.getMonth() + 1)
  const [selectedYearGreg, setSelectedYearGreg] = useState(today.getFullYear())
  
  const [hoveredHoliday, setHoveredHoliday] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarMode, setCalendarMode] = useState('13month') // '13month' or 'gregorian'
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const isDark = theme === 'dark' || theme === 'blackice'
  const isBlackIce = theme === 'blackice'
  
  // Handle calendar mode switching with date synchronization
  const handleModeSwitch = () => {
    setIsTransitioning(true)
    setSelectedDate(null) // Clear selection when switching modes
    
    if (calendarMode === '13month') {
      // Switching to Gregorian: convert current 13-month date
      try {
        const gregorianDate = thirteenMonthToGregorian(selectedYear13, selectedMonth13, 1)
        setSelectedMonthGreg(gregorianDate.getMonth() + 1)
        setSelectedYearGreg(gregorianDate.getFullYear())
      } catch (e) {
        // Fallback to today if conversion fails
        setSelectedMonthGreg(today.getMonth() + 1)
        setSelectedYearGreg(today.getFullYear())
      }
    } else {
      // Switching to 13-month: convert current Gregorian date
      const gregorianDate = new Date(selectedYearGreg, selectedMonthGreg - 1, 1)
      const thirteenMonth = gregorianTo13Month(gregorianDate)
      setSelectedMonth13(thirteenMonth.month)
      setSelectedYear13(thirteenMonth.year)
    }
    
    setCalendarMode(calendarMode === '13month' ? 'gregorian' : '13month')
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const navigateMonth13 = (direction) => {
    setSelectedDate(null) // Clear selection when navigating
    if (direction === 'prev') {
      if (selectedMonth13 === 1) {
        setSelectedMonth13(13)
        setSelectedYear13(selectedYear13 - 1)
      } else {
        setSelectedMonth13(selectedMonth13 - 1)
      }
    } else {
      if (selectedMonth13 === 13) {
        setSelectedMonth13(1)
        setSelectedYear13(selectedYear13 + 1)
      } else {
        setSelectedMonth13(selectedMonth13 + 1)
      }
    }
  }

  const renderDay13Month = (dayNum, index) => {
    const monthHolidays = holidays[selectedMonth13] || {}
    const holiday = monthHolidays[dayNum]
    const Icon = holiday?.icon
    const isSpecialDay = dayNum === 29 || dayNum === 30
    
    // Check if this is today
    const isToday = isSameDate13Month(currentDate13Month, {
      year: selectedYear13,
      month: selectedMonth13,
      day: dayNum
    })
    
    // Check if this is the selected date
    const isSelected = selectedDate && 
      selectedDate.year === selectedYear13 && 
      selectedDate.month === selectedMonth13 && 
      selectedDate.day === dayNum

    const handleClick = () => {
      setSelectedDate({
        year: selectedYear13,
        month: selectedMonth13,
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
            isSpecialDay ? 'bg-gradient-to-br from-blue-400/20 to-indigo-400/20 border border-blue-400/30' : 
            'bg-slate-800/40 border border-cyan-500/10 hover:bg-slate-700/50 hover:border-cyan-400/20 hover:shadow-lg hover:shadow-cyan-500/10'
          ) : isDark ? (
            isToday ? 'bg-gradient-to-br from-blue-400/40 to-cyan-400/40 border-2 border-blue-300/50 shadow-lg shadow-blue-500/25' : 
            isSelected ? 'bg-gradient-to-br from-green-400/40 to-emerald-400/40 border-2 border-green-300/50 shadow-lg shadow-green-500/25' :
            isSpecialDay ? 'bg-gradient-to-br from-purple-400/30 to-pink-400/30 border border-purple-300/50' : 
            'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10'
          ) : (
            isToday ? 'bg-gradient-to-br from-blue-500/50 to-cyan-500/50 border-2 border-blue-400/70 shadow-lg shadow-blue-500/30' : 
            isSelected ? 'bg-gradient-to-br from-green-500/50 to-emerald-500/50 border-2 border-green-400/70 shadow-lg shadow-green-500/30' :
            isSpecialDay ? 'bg-gradient-to-br from-purple-500/40 to-pink-500/40 border border-purple-400/60' : 
            'bg-white/60 border border-gray-300/50 hover:bg-white/80 hover:border-gray-400/60 hover:shadow-lg'
          )}
        `}
        onClick={handleClick}
        onMouseEnter={() => holiday && setHoveredHoliday({ ...holiday, day: dayNum })}
        onMouseLeave={() => setHoveredHoliday(null)}
      >
        <span className={`text-lg font-medium transition-all duration-300 ${
          isBlackIce ? (
            isToday ? 'text-cyan-100 font-bold drop-shadow-lg' : 
            isSelected ? 'text-emerald-100 font-bold drop-shadow-lg' : 
            isSpecialDay ? 'text-blue-200 font-semibold' : 
            'text-cyan-200/90 group-hover:text-cyan-100 group-hover:scale-110'
          ) : isDark ? (
            isToday ? 'text-white font-bold drop-shadow-lg' : 
            isSelected ? 'text-white font-bold drop-shadow-lg' : 
            isSpecialDay ? 'text-purple-100 font-semibold' : 
            'text-white/90 group-hover:text-white group-hover:scale-110'
          ) : (
            isToday ? 'text-white font-bold drop-shadow' : 
            isSelected ? 'text-white font-bold drop-shadow' : 
            isSpecialDay ? 'text-purple-700 font-semibold' : 
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
        
        {hoveredHoliday?.day === dayNum && (
          <div className={`absolute z-20 bottom-full mb-3 px-4 py-3 backdrop-blur-xl bg-black/70 text-white text-sm rounded-xl whitespace-nowrap border border-white/20 shadow-xl ${
            isLeftEdge ? 'left-0' : isRightEdge ? 'right-0' : 'left-1/2 transform -translate-x-1/2'
          }`}>
            <div className="font-bold text-white">{holiday.name}</div>
            <div className="text-white/80 text-xs mt-1">{holiday.description}</div>
            <div className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/70 ${
              isLeftEdge ? 'left-4' : isRightEdge ? 'right-4' : 'left-1/2 transform -translate-x-1/2'
            }`}></div>
          </div>
        )}
      </div>
    )
  }

  const render13MonthCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth13, selectedYear13)
    
    return (
      <>
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigateMonth13('prev')}
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
                {monthNames[selectedMonth13 - 1]} {selectedYear13}
              </h2>
              
              {/* Calendar Mode Toggle Button */}
              <button
                onClick={handleModeSwitch}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 border shadow-lg group ml-4 ${
                  isBlackIce
                    ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/30'
                    : isDark
                    ? 'bg-indigo-400/20 hover:bg-indigo-400/30 border-indigo-400/30'
                    : 'bg-indigo-600/20 hover:bg-indigo-600/30 border-indigo-600/30'
                }`}
                title={calendarMode === '13month' ? "Switch to Gregorian Calendar" : "Switch to 13-Month Calendar"}
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
              Month {selectedMonth13} of 13
            </p>
            {(selectedMonth13 !== currentDate13Month.month || selectedYear13 !== currentDate13Month.year) && (
              <button
                onClick={() => {
                  setSelectedMonth13(currentDate13Month.month)
                  setSelectedYear13(currentDate13Month.year)
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
            onClick={() => navigateMonth13('next')}
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
          
          {/* Regular 28 days */}
          {[...Array(28)].map((_, i) => renderDay13Month(i + 1, i))}
          
          {/* New Year's Day (29th) for Yule */}
          {selectedMonth13 === 13 && renderDay13Month(29, 28)}
          
          {/* New Year's Leap (30th) for Yule in leap years */}
          {selectedMonth13 === 13 && daysInMonth === 30 && renderDay13Month(30, 29)}
        </div>

        {selectedMonth13 === 13 && (
          <div className={`mt-6 text-center text-sm backdrop-blur-md rounded-xl p-4 border ${
            isBlackIce
              ? 'text-cyan-200/80 bg-slate-900/30 border-cyan-500/20'
              : isDark 
              ? 'text-white/80 bg-white/5 border-white/10' 
              : 'text-gray-700 bg-white/40 border-gray-300/30'
          }`}>
            <p className="flex items-center justify-center gap-1">
              <span className={`font-bold ${isBlackIce ? 'text-cyan-400' : isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                New Year's Day
              </span> 
              is a special day outside of regular time
            </p>
            {daysInMonth === 30 && (
              <p className="mt-2 flex items-center justify-center gap-1">
                <span className={`font-bold ${isBlackIce ? 'text-cyan-400' : isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                  New Year's Leap
                </span> 
                appears only in leap years
              </p>
            )}
          </div>
        )}
        
        <div className={`mt-6 text-center text-sm backdrop-blur-md rounded-xl p-5 border ${
          isBlackIce
            ? 'bg-slate-900/30 border-cyan-500/20'
            : isDark 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/40 border-gray-300/30'
        }`}>
          <p className={isBlackIce ? 'text-cyan-100' : isDark ? 'text-white/90' : 'text-gray-800'}>
            Today: <span className={`font-bold ${isBlackIce ? 'text-cyan-400' : isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
              {monthNames[currentDate13Month.month - 1]} {currentDate13Month.day}, {currentDate13Month.year}
            </span>
            {currentDate13Month.isNewYearsDay && " (New Year's Day)"}
            {currentDate13Month.isNewYearsLeap && " (New Year's Leap)"}
          </p>
          <p className={`text-xs mt-1 ${isBlackIce ? 'text-cyan-200/60' : isDark ? 'text-white/60' : 'text-gray-600'}`}>
            Gregorian: {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          {selectedDate && (
            <div className={`mt-4 pt-4 border-t ${isBlackIce ? 'border-cyan-500/20' : isDark ? 'border-white/20' : 'border-gray-300/30'}`}>
              <p className={isBlackIce ? 'text-cyan-100' : isDark ? 'text-white/90' : 'text-gray-800'}>
                Selected: <span className={`font-bold ${isBlackIce ? 'text-emerald-400' : isDark ? 'text-green-300' : 'text-green-600'}`}>
                  {monthNames[selectedDate.month - 1]} {selectedDate.day}, {selectedDate.year}
                </span>
                {selectedDate.month === 13 && selectedDate.day === 29 && " (New Year's Day)"}
                {selectedDate.month === 13 && selectedDate.day === 30 && " (New Year's Leap)"}
              </p>
              <p className={`text-xs mt-1 ${isBlackIce ? 'text-cyan-200/60' : isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Gregorian: {thirteenMonthToGregorian(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto border relative overflow-visible transition-all duration-700 ${
      isBlackIce 
        ? 'bg-slate-900/40 border-cyan-500/20' 
        : isDark
        ? 'bg-white/10 border-white/20' 
        : 'bg-white/30 border-white/40'
    }`}>
      {/* Glass shine effect */}
      <div className={`absolute inset-0 pointer-events-none ${
        isBlackIce
          ? 'bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent'
          : isDark
          ? 'bg-gradient-to-br from-white/20 via-transparent to-transparent'
          : 'bg-gradient-to-br from-white/40 via-transparent to-transparent'
      }`}></div>
      
      <div className={`relative z-10 transition-all duration-500 ${
        isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
      }`}>
        {calendarMode === '13month' ? (
          render13MonthCalendar()
        ) : (
          <GregorianCalendar 
            theme={theme}
            selectedMonth={selectedMonthGreg}
            selectedYear={selectedYearGreg}
            setSelectedMonth={setSelectedMonthGreg}
            setSelectedYear={setSelectedYearGreg}
            onModeSwitch={handleModeSwitch}
            setTheme={setTheme}
          />
        )}
      </div>
    </div>
  )
}

export default Calendar