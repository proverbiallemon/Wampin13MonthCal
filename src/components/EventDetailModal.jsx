import { XMarkIcon, ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { getEventTimeDisplay, formatEventDateRange } from '../hooks/useEventHelpers'

function EventDetailModal({ event, onClose, theme }) {
  if (!event) return null

  const isDark = theme === 'dark' || theme === 'blackice'
  const isBlackIce = theme === 'blackice'

  const timeDisplay = getEventTimeDisplay(event)
  const { gregorian, thirteenMonth } = formatEventDateRange(event)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md backdrop-blur-xl rounded-2xl shadow-2xl border p-6 ${
          isBlackIce
            ? 'bg-slate-900/80 border-cyan-500/30'
            : isDark
            ? 'bg-gray-900/80 border-white/20'
            : 'bg-white/90 border-gray-200/60'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-all duration-200 ${
            isBlackIce
              ? 'hover:bg-cyan-500/20 text-cyan-300'
              : isDark
              ? 'hover:bg-white/10 text-white/70'
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className={`text-xl font-bold pr-8 ${
          isBlackIce ? 'text-cyan-100' : isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {event.summary || 'Untitled Event'}
        </h2>

        {/* Time */}
        <div className={`flex items-center gap-2 mt-3 text-sm ${
          isBlackIce ? 'text-cyan-200/80' : isDark ? 'text-white/80' : 'text-gray-600'
        }`}>
          <ClockIcon className="w-4 h-4 flex-shrink-0" />
          <span>{timeDisplay}</span>
        </div>

        {/* Gregorian date */}
        <div className={`flex items-center gap-2 mt-2 text-sm ${
          isBlackIce ? 'text-cyan-200/80' : isDark ? 'text-white/80' : 'text-gray-600'
        }`}>
          <CalendarDaysIcon className="w-4 h-4 flex-shrink-0" />
          <span>{gregorian}</span>
        </div>

        {/* 13-month date */}
        <div className={`mt-2 text-sm pl-6 ${
          isBlackIce ? 'text-cyan-300/70' : isDark ? 'text-purple-300/80' : 'text-purple-600/80'
        }`}>
          13-Month: {thirteenMonth}
        </div>

        {/* Description */}
        {event.description && (
          <div className={`mt-4 pt-4 border-t text-sm whitespace-pre-wrap ${
            isBlackIce
              ? 'border-cyan-500/20 text-cyan-200/70'
              : isDark
              ? 'border-white/10 text-white/70'
              : 'border-gray-200 text-gray-600'
          }`}>
            {event.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetailModal
