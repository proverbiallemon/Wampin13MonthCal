import React, { useState, useEffect } from 'react'
import { ArrowPathIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { gregorianTo13Month } from '../utils/dateConversion'

function GoogleCalendarSync({ theme, onEventsLoaded }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)
  
  const isDark = theme === 'dark' || theme === 'blackice'
  const isBlackIce = theme === 'blackice'

  useEffect(() => {
    // Check if we have tokens in URL hash (from OAuth redirect)
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get('access_token')
      if (accessToken) {
        localStorage.setItem('google_access_token', accessToken)
        setIsAuthenticated(true)
        window.location.hash = '' // Clean up URL
        fetchEvents(accessToken)
      }
    } else {
      // Check if we have a stored token
      const storedToken = localStorage.getItem('google_access_token')
      if (storedToken) {
        setIsAuthenticated(true)
      }
    }
  }, [])

  const handleLogin = () => {
    window.location.href = '/api/auth/google?action=login'
  }

  const handleLogout = () => {
    localStorage.removeItem('google_access_token')
    setIsAuthenticated(false)
    setEvents([])
    if (onEventsLoaded) onEventsLoaded([])
  }

  const fetchEvents = async (token = null) => {
    setIsLoading(true)
    setError(null)
    
    const accessToken = token || localStorage.getItem('google_access_token')
    if (!accessToken) {
      setError('No access token found')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/calendar', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, need to re-authenticate
          handleLogout()
          setError('Session expired. Please sign in again.')
        } else {
          throw new Error('Failed to fetch events')
        }
        return
      }

      const data = await response.json()
      
      // Convert events to include 13-month dates
      const eventsWithDates = data.events.map(event => {
        const startDate = new Date(event.start)
        const endDate = new Date(event.end)
        
        return {
          ...event,
          gregorianStart: startDate,
          gregorianEnd: endDate,
          thirteenMonthStart: gregorianTo13Month(startDate),
          thirteenMonthEnd: gregorianTo13Month(endDate)
        }
      })

      setEvents(eventsWithDates)
      if (onEventsLoaded) onEventsLoaded(eventsWithDates)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`mt-4 backdrop-blur-md rounded-xl p-4 border transition-all duration-300 ${
      isBlackIce
        ? 'bg-slate-900/30 border-cyan-500/20'
        : isDark 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/40 border-gray-300/30'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className={`w-5 h-5 ${
            isBlackIce ? 'text-cyan-400' : isDark ? 'text-purple-300' : 'text-purple-600'
          }`} />
          <h3 className={`text-sm font-semibold ${
            isBlackIce ? 'text-cyan-100' : isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Google Calendar
          </h3>
        </div>
        
        {isAuthenticated && (
          <button
            onClick={() => fetchEvents()}
            disabled={isLoading}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              isBlackIce
                ? 'hover:bg-cyan-500/20 text-cyan-300'
                : isDark
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-purple-100 text-gray-700'
            } ${isLoading ? 'animate-spin' : ''}`}
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isAuthenticated ? (
        <button
          onClick={handleLogin}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            isBlackIce
              ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 border border-cyan-400/50'
              : isDark
              ? 'bg-purple-500/20 hover:bg-purple-500/30 text-white border border-purple-400/50'
              : 'bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300'
          }`}
        >
          Sign in with Google
        </button>
      ) : (
        <div>
          {isLoading && (
            <p className={`text-xs ${
              isBlackIce ? 'text-cyan-200/60' : isDark ? 'text-white/60' : 'text-gray-500'
            }`}>
              Loading events...
            </p>
          )}
          
          {error && (
            <p className={`text-xs text-red-500`}>
              {error}
            </p>
          )}
          
          {!isLoading && !error && (
            <div>
              <p className={`text-xs ${
                isBlackIce ? 'text-cyan-200/60' : isDark ? 'text-white/60' : 'text-gray-500'
              }`}>
                {events.length} events synced
              </p>
              
              <button
                onClick={handleLogout}
                className={`mt-2 text-xs ${
                  isBlackIce 
                    ? 'text-cyan-300/60 hover:text-cyan-300' 
                    : isDark 
                    ? 'text-white/60 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GoogleCalendarSync