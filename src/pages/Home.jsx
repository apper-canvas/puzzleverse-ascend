import { useState, useEffect } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [difficulty, setDifficulty] = useState('medium')

  const puzzleTypes = [
    { 
      id: 'sudoku', 
      name: 'Sudoku', 
      icon: 'Grid3X3', 
      color: 'text-puzzle-sudoku',
      available: true 
    },
    { 
      id: 'crossword', 
      name: 'Crossword', 
      icon: 'Hash', 
      color: 'text-puzzle-crossword',
      available: false 
    },
    { 
      id: 'jigsaw', 
      name: 'Jigsaw', 
      icon: 'Puzzle', 
      color: 'text-puzzle-jigsaw',
      available: false 
    },
    { 
      id: 'logic', 
      name: 'Logic', 
      icon: 'Brain', 
      color: 'text-puzzle-logic',
      available: false 
    },
    { 
      id: 'trivia', 
      name: 'Trivia', 
      icon: 'HelpCircle', 
      color: 'text-puzzle-trivia',
      available: false 
    }
  ]

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'bg-orange-500' },
    { value: 'expert', label: 'Expert', color: 'bg-red-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary/5">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-2xl transition-all duration-300 z-40 ${
        sidebarExpanded ? 'w-72' : 'w-20'
      }`}>
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <ApperIcon name="Puzzle" className="w-6 h-6 text-white" />
            </div>
            {sidebarExpanded && (
              <div className="ml-3">
                <h1 className="text-xl font-heading font-bold gradient-text">PuzzleVerse</h1>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {puzzleTypes.map((puzzle, index) => (
              <div key={puzzle.id} className="relative group">
                <div className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  puzzle.available 
                    ? 'hover:bg-surface-100 text-surface-700 hover:text-primary' 
                    : 'text-surface-400 cursor-not-allowed'
                }`}>
                  <ApperIcon name={puzzle.icon} className={`w-6 h-6 ${puzzle.color}`} />
                  {sidebarExpanded && (
                    <span className="ml-3 font-medium">{puzzle.name}</span>
                  )}
                  {!puzzle.available && !sidebarExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-surface-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Coming soon!
                    </div>
                  )}
                </div>
                {!puzzle.available && sidebarExpanded && (
                  <div className="ml-9 text-xs text-surface-400">Coming soon!</div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="absolute -right-4 top-8 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-surface-50 transition-colors"
          >
            <ApperIcon 
              name={sidebarExpanded ? "ChevronLeft" : "ChevronRight"} 
              className="w-4 h-4 text-surface-600" 
            />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarExpanded ? 'ml-72' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-surface-100 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-heading font-bold text-surface-900">Daily Puzzles</h2>
              <p className="text-surface-600">Challenge your mind, one puzzle at a time</p>
            </div>
            
            {/* Difficulty Selector */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="appearance-none bg-white border-2 border-surface-200 rounded-xl px-4 py-2 pr-10 font-medium text-surface-700 focus:border-primary focus:outline-none hover:border-surface-300 transition-colors"
                >
                  {difficultyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ApperIcon name="ChevronDown" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none" />
              </div>
              
              {/* Difficulty Badge */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${difficultyOptions.find(opt => opt.value === difficulty)?.color}`}></div>
                <span className="text-sm font-medium text-surface-600 capitalize">{difficulty}</span>
              </div>

              {/* Achievements Icon */}
              <div className="relative group">
                <button className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors">
                  <ApperIcon name="Trophy" className="w-6 h-6 text-surface-600" />
                </button>
                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-surface-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Unlock achievements soon! (0/50)
                </div>
              </div>

              {/* Settings Icon */}
              <div className="relative group">
                <button className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors">
                  <ApperIcon name="Settings" className="w-6 h-6 text-surface-600" />
                </button>
                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-surface-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Customization options coming soon!
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Daily Challenge Card */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-white shadow-2xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-2">Daily Challenge</h3>
                    <p className="text-primary-light text-lg">Today's Sudoku - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level</p>
                    <div className="flex items-center gap-2 mt-3">
                      <ApperIcon name="Users" className="w-5 h-5" />
                      <span className="text-sm">2,847 players participating today</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <ApperIcon name="Flame" className="w-5 h-5 text-orange-300" />
                      <span>7-day streak!</span>
                    </div>
                    <button className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-surface-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
                      Start Challenge
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Puzzle Area */}
            <MainFeature difficulty={difficulty} />

            {/* Placeholder Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Leaderboard */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-heading font-semibold mb-4 text-surface-900">Daily Leaderboard</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg animate-pulse">
                      <div className="w-6 h-6 bg-surface-200 rounded-full"></div>
                      <div className="flex-1 h-4 bg-surface-200 rounded"></div>
                      <div className="w-16 h-4 bg-surface-200 rounded"></div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-surface-500 text-sm mt-4">Feature launching soon!</p>
              </div>

              {/* Progress Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-heading font-semibold mb-4 text-surface-900">Your Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Puzzles Solved</span>
                    <div className="w-16 h-6 bg-surface-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Best Time</span>
                    <div className="w-20 h-6 bg-surface-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Current Streak</span>
                    <div className="w-12 h-6 bg-surface-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <p className="text-center text-surface-500 text-sm mt-4">Track your journey - Coming soon</p>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-heading font-semibold mb-4 text-surface-900">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-surface-50 rounded-lg">
                    <div className="w-8 h-8 bg-surface-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="w-12 h-4 bg-surface-200 rounded mx-auto animate-pulse"></div>
                  </div>
                  <div className="text-center p-3 bg-surface-50 rounded-lg">
                    <div className="w-8 h-8 bg-surface-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="w-16 h-4 bg-surface-200 rounded mx-auto animate-pulse"></div>
                  </div>
                </div>
                <p className="text-center text-surface-500 text-sm mt-4">Statistics coming soon!</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home