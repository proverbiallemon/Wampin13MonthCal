import React from 'react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function PerpetualDayIndicator({ theme, selectedDay }) {
  const isDark = theme === 'dark' || theme === 'blackice'
  const isBlackIce = theme === 'blackice'
  
  // In the 13-month calendar, the same date falls on the same day every month
  // Day 1, 8, 15, 22 are always the same day of the week
  // Day 2, 9, 16, 23 are always the next day, etc.
  
  // Calculate which dates fall on the selected day
  const getDatesForDay = (dayOfWeek) => {
    const dates = []
    for (let i = dayOfWeek + 1; i <= 28; i += 7) {
      dates.push(i)
    }
    return dates
  }
  
  return (
    <div className={`mt-4 backdrop-blur-md rounded-xl p-4 border transition-all duration-300 ${
      isBlackIce
        ? 'bg-slate-900/30 border-cyan-500/20'
        : isDark 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/40 border-gray-300/30'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <CalendarDaysIcon className={`w-5 h-5 ${
          isBlackIce ? 'text-cyan-400' : isDark ? 'text-purple-300' : 'text-purple-600'
        }`} />
        <h3 className={`text-sm font-semibold ${
          isBlackIce ? 'text-cyan-100' : isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Perpetual Day Pattern
        </h3>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {dayNames.map((day, index) => {
          const dates = getDatesForDay(index)
          const isSelected = selectedDay && dates.includes(selectedDay)
          
          return (
            <div 
              key={day} 
              className={`text-center p-2 rounded-lg transition-all duration-200 ${
                isSelected
                  ? isBlackIce
                    ? 'bg-cyan-500/20 border border-cyan-400/50'
                    : isDark
                    ? 'bg-purple-500/20 border border-purple-400/50'
                    : 'bg-purple-100 border border-purple-300'
                  : ''
              }`}
            >
              <div className={`text-xs font-medium mb-1 ${
                isBlackIce ? 'text-cyan-300/70' : isDark ? 'text-white/70' : 'text-gray-600'
              }`}>
                {day.slice(0, 3)}
              </div>
              <div className={`text-xs ${
                isSelected
                  ? isBlackIce ? 'text-cyan-100' : isDark ? 'text-white' : 'text-purple-700'
                  : isBlackIce ? 'text-cyan-200/60' : isDark ? 'text-white/60' : 'text-gray-500'
              }`}>
                {dates.join(', ')}
              </div>
            </div>
          )
        })}
      </div>
      
      <p className={`text-xs mt-3 text-center ${
        isBlackIce ? 'text-cyan-200/50' : isDark ? 'text-white/50' : 'text-gray-500'
      }`}>
        In the 13-month calendar, every date falls on the same weekday all year long!
      </p>
    </div>
  )
}

export default PerpetualDayIndicator