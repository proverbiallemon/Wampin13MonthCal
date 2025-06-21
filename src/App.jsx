import { useState, useEffect } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Calendar from './components/Calendar'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className={`relative min-h-screen overflow-hidden transition-all duration-700`}>
      {/* Animated gradient background */}
      <div className={`fixed inset-0 transition-all duration-700 ${
        theme === 'blackice' 
          ? 'bg-gradient-to-br from-black via-slate-950 to-black' 
          : theme === 'dark'
          ? 'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600' 
          : 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100'
      }`}>
        <div className={`absolute inset-0 animate-pulse ${
          theme === 'blackice'
            ? 'bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10'
            : theme === 'dark'
            ? 'bg-gradient-to-tr from-pink-500/30 via-transparent to-yellow-500/30'
            : 'bg-gradient-to-tr from-blue-300/20 via-transparent to-purple-300/20'
        }`}></div>
      </div>
      
      {/* Floating orbs for depth */}
      <div className={`fixed top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse transition-all duration-700 ${
        theme === 'blackice' ? 'bg-cyan-500/10' : theme === 'dark' ? 'bg-purple-500/30' : 'bg-purple-300/40'
      }`}></div>
      <div className={`fixed bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-700 ${
        theme === 'blackice' ? 'bg-blue-500/10' : theme === 'dark' ? 'bg-cyan-500/30' : 'bg-blue-300/40'
      }`} style={{animationDelay: '2s'}}></div>
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl transition-all duration-700 ${
        theme === 'blackice' ? 'bg-slate-900/50' : theme === 'dark' ? 'bg-blue-500/20' : 'bg-pink-300/30'
      }`}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <StarIconSolid className={`w-10 h-10 drop-shadow-lg animate-pulse ${
            theme === 'blackice' ? 'text-cyan-400' : theme === 'dark' ? 'text-yellow-300' : 'text-yellow-500'
          }`} />
          <h1 className={`text-5xl font-bold text-center drop-shadow-2xl ${
            theme === 'blackice' ? 'text-cyan-100' : theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            13 Month Calendar
          </h1>
          <StarIconSolid className={`w-10 h-10 drop-shadow-lg animate-pulse ${
            theme === 'blackice' ? 'text-cyan-400' : theme === 'dark' ? 'text-yellow-300' : 'text-yellow-500'
          }`} />
        </div>
        <p className={`text-center mb-10 flex items-center justify-center gap-2 text-lg ${
          theme === 'blackice' ? 'text-cyan-200/80' : theme === 'dark' ? 'text-white/90' : 'text-gray-700'
        }`}>
          <SparklesIcon className={`w-6 h-6 ${
            theme === 'blackice' ? 'text-cyan-400' : theme === 'dark' ? 'text-yellow-300' : 'text-purple-500'
          }`} />
          A calendar with 13 months of 28 days each, plus New Year's Day
          <SparklesIcon className={`w-6 h-6 ${
            theme === 'blackice' ? 'text-cyan-400' : theme === 'dark' ? 'text-yellow-300' : 'text-purple-500'
          }`} />
        </p>
        
        <Calendar theme={theme} setTheme={setTheme} />
      </div>
    </div>
  )
}

export default App