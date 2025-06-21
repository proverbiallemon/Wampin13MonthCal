import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { monthNames as thirteenMonthNames, getDaysInMonth, isLeapYear } from '../utils/calendarData'
import { getCurrentDate13Month } from '../utils/dateConversion'

const gregorianMonthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function DatePicker({ 
  isOpen, 
  onClose, 
  selectedMonth, 
  selectedYear, 
  onDateSelect, 
  calendarMode, 
  theme 
}) {
  const dropdownRef = useRef(null)
  const [viewMode, setViewMode] = useState('days') // 'days', 'months', 'years'
  const [tempMonth, setTempMonth] = useState(selectedMonth)
  const [tempYear, setTempYear] = useState(selectedYear)
  const [yearRangeStart, setYearRangeStart] = useState(selectedYear - 5)
  
  const isDark = theme === 'dark' || theme === 'blackice'
  const isBlackIce = theme === 'blackice'
  
  const monthNames = calendarMode === '13month' ? thirteenMonthNames : gregorianMonthNames
  const monthCount = calendarMode === '13month' ? 13 : 12

  useEffect(() => {
    setTempMonth(selectedMonth)
    setTempYear(selectedYear)
    setYearRangeStart(selectedYear - 5)
    setViewMode('days')
  }, [selectedMonth, selectedYear, isOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleKeyDown = (event) => {
      if (!isOpen) return
      
      if (event.key === 'Escape') {
        onClose()
      } else if (viewMode === 'years') {
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          setYearRangeStart(yearRangeStart - 12)
        } else if (event.key === 'ArrowDown') {
          event.preventDefault()
          setYearRangeStart(yearRangeStart + 12)
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose, viewMode, yearRangeStart])

  const getDaysInGregorianMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  const getFirstDayOfMonth = () => {
    if (calendarMode === '13month') {
      // For 13-month calendar, we'll start all months on Sunday for simplicity
      return 0
    } else {
      return new Date(tempYear, tempMonth - 1, 1).getDay()
    }
  }

  const getDaysCount = () => {
    if (calendarMode === '13month') {
      return getDaysInMonth(tempMonth, tempYear)
    } else {
      return getDaysInGregorianMonth(tempMonth, tempYear)
    }
  }

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (tempMonth === 1) {
        setTempMonth(monthCount)
        setTempYear(tempYear - 1)
      } else {
        setTempMonth(tempMonth - 1)
      }
    } else {
      if (tempMonth === monthCount) {
        setTempMonth(1)
        setTempYear(tempYear + 1)
      } else {
        setTempMonth(tempMonth + 1)
      }
    }
  }

  const handleYearChange = (year) => {
    setTempYear(year)
    setViewMode('months')
  }

  const handleMonthSelect = (month) => {
    setTempMonth(month)
    setViewMode('days')
  }

  const handleDaySelect = (day) => {
    onDateSelect(tempMonth, tempYear, day)
    onClose()
  }

  const renderYearPicker = () => {
    const years = []
    
    for (let i = 0; i < 12; i++) {
      years.push(yearRangeStart + i)
    }

    return (
      <div className="relative">
        {/* Year range indicator */}
        <div className="flex justify-center px-4 py-2">
          <button
            onClick={() => setYearRangeStart(new Date().getFullYear() - 5)}
            className={`text-xs font-medium px-2 py-1 rounded transition-all duration-200 ${
              isBlackIce 
                ? 'text-cyan-300/60 hover:text-cyan-300 hover:bg-cyan-500/10' 
                : isDark 
                ? 'text-white/60 hover:text-white hover:bg-white/10' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-purple-50'
            }`}
            title="Jump to current year"
          >
            {yearRangeStart} - {yearRangeStart + 11}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4">
          {years.map(year => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`py-3 px-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                year === tempYear
                  ? isBlackIce
                    ? 'bg-cyan-500/30 text-cyan-100 border border-cyan-400/50'
                    : isDark
                    ? 'bg-purple-500/30 text-white border border-purple-400/50'
                    : 'bg-purple-500/20 text-purple-700 border border-purple-400/50'
                  : isBlackIce
                  ? 'hover:bg-cyan-500/10 text-cyan-200/80 hover:text-cyan-100'
                  : isDark
                  ? 'hover:bg-white/10 text-white/80 hover:text-white'
                  : 'hover:bg-purple-100 text-gray-700 hover:text-purple-700'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-2 p-3">
          <button
            onClick={() => setYearRangeStart(yearRangeStart - 12)}
            className={`p-2 rounded-lg backdrop-blur-md transition-all duration-200 border shadow-md ${
              isBlackIce
                ? 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-300'
                : isDark
                ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-gray-700'
            }`}
            title="Previous 12 years"
          >
            <ChevronUpIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setYearRangeStart(yearRangeStart + 12)}
            className={`p-2 rounded-lg backdrop-blur-md transition-all duration-200 border shadow-md ${
              isBlackIce
                ? 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-300'
                : isDark
                ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-gray-700'
            }`}
            title="Next 12 years"
          >
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  const renderMonthPicker = () => {
    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {monthNames.map((month, index) => (
          <button
            key={month}
            onClick={() => handleMonthSelect(index + 1)}
            className={`py-3 px-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              index + 1 === tempMonth
                ? isBlackIce
                  ? 'bg-cyan-500/30 text-cyan-100 border border-cyan-400/50'
                  : isDark
                  ? 'bg-purple-500/30 text-white border border-purple-400/50'
                  : 'bg-purple-500/20 text-purple-700 border border-purple-400/50'
                : isBlackIce
                ? 'hover:bg-cyan-500/10 text-cyan-200/80 hover:text-cyan-100'
                : isDark
                ? 'hover:bg-white/10 text-white/80 hover:text-white'
                : 'hover:bg-purple-100 text-gray-700 hover:text-purple-700'
            }`}
          >
            {month.slice(0, 3)}
          </button>
        ))}
      </div>
    )
  }

  const renderDayPicker = () => {
    const daysInMonth = getDaysCount()
    const firstDay = getFirstDayOfMonth()
    const days = []

    // Add empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />)
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentSelection = day === new Date().getDate() && 
                                tempMonth === (calendarMode === '13month' ? getCurrentDate13Month().month : new Date().getMonth() + 1) && 
                                tempYear === new Date().getFullYear()

      // Special days for 13-month calendar
      const isSpecialDay = calendarMode === '13month' && 
                          tempMonth === 13 && 
                          (day === 29 || day === 30)

      days.push(
        <button
          key={day}
          onClick={() => handleDaySelect(day)}
          className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
            isCurrentSelection
              ? isBlackIce
                ? 'bg-gradient-to-br from-cyan-400/40 to-blue-400/40 text-cyan-100 border border-cyan-400/60'
                : isDark
                ? 'bg-gradient-to-br from-purple-400/40 to-blue-400/40 text-white border border-purple-400/60'
                : 'bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-purple-700 border border-purple-400/60'
              : isSpecialDay
              ? isBlackIce
                ? 'bg-blue-400/20 text-blue-200 border border-blue-400/30'
                : isDark
                ? 'bg-purple-400/20 text-purple-200 border border-purple-400/30'
                : 'bg-purple-500/10 text-purple-600 border border-purple-400/30'
              : isBlackIce
              ? 'hover:bg-cyan-500/20 text-cyan-200/80 hover:text-cyan-100'
              : isDark
              ? 'hover:bg-white/10 text-white/80 hover:text-white'
              : 'hover:bg-purple-100 text-gray-700 hover:text-purple-700'
          }`}
        >
          {day}
        </button>
      )
    }

    return (
      <>
        <div className="grid grid-cols-7 gap-1 px-4 pb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div 
              key={day} 
              className={`text-center text-xs font-semibold ${
                isBlackIce ? 'text-cyan-300/60' : isDark ? 'text-white/60' : 'text-gray-500'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 px-4 pb-4">
          {days}
        </div>
      </>
    )
  }

  if (!isOpen) return null

  return (
    <div 
      ref={dropdownRef}
      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 backdrop-blur-xl rounded-2xl shadow-2xl border z-50 transition-all duration-300 ${
        isBlackIce
          ? 'bg-slate-900/90 border-cyan-500/30'
          : isDark
          ? 'bg-gray-900/90 border-white/20'
          : 'bg-white/90 border-gray-300/50'
      } ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        isBlackIce ? 'border-cyan-500/20' : isDark ? 'border-white/10' : 'border-gray-200'
      }`}>
        <button
          onClick={() => handleMonthChange('prev')}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            isBlackIce
              ? 'hover:bg-cyan-500/20 text-cyan-300'
              : isDark
              ? 'hover:bg-white/10 text-white'
              : 'hover:bg-purple-100 text-gray-700'
          }`}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('months')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewMode === 'months'
                ? isBlackIce
                  ? 'bg-cyan-500/20 text-cyan-100'
                  : isDark
                  ? 'bg-purple-500/20 text-white'
                  : 'bg-purple-100 text-purple-700'
                : isBlackIce
                ? 'hover:bg-cyan-500/10 text-cyan-200'
                : isDark
                ? 'hover:bg-white/10 text-white/80'
                : 'hover:bg-purple-50 text-gray-700'
            }`}
          >
            {monthNames[tempMonth - 1]}
          </button>
          
          <button
            onClick={() => setViewMode('years')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewMode === 'years'
                ? isBlackIce
                  ? 'bg-cyan-500/20 text-cyan-100'
                  : isDark
                  ? 'bg-purple-500/20 text-white'
                  : 'bg-purple-100 text-purple-700'
                : isBlackIce
                ? 'hover:bg-cyan-500/10 text-cyan-200'
                : isDark
                ? 'hover:bg-white/10 text-white/80'
                : 'hover:bg-purple-50 text-gray-700'
            }`}
          >
            {tempYear}
          </button>
        </div>

        <button
          onClick={() => handleMonthChange('next')}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            isBlackIce
              ? 'hover:bg-cyan-500/20 text-cyan-300'
              : isDark
              ? 'hover:bg-white/10 text-white'
              : 'hover:bg-purple-100 text-gray-700'
          }`}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="max-h-80 overflow-y-auto">
        {viewMode === 'days' && renderDayPicker()}
        {viewMode === 'months' && renderMonthPicker()}
        {viewMode === 'years' && renderYearPicker()}
      </div>

      {/* Footer for special days */}
      {calendarMode === '13month' && tempMonth === 13 && viewMode === 'days' && (
        <div className={`px-4 pb-3 text-xs text-center ${
          isBlackIce ? 'text-cyan-300/60' : isDark ? 'text-white/60' : 'text-gray-500'
        }`}>
          {getDaysCount() === 30 ? 'Day 29: New Year\'s Day • Day 30: New Year\'s Leap' : 'Day 29: New Year\'s Day'}
        </div>
      )}
    </div>
  )
}

export default DatePicker