import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { puzzleService } from '../services'

const MainFeature = ({ difficulty }) => {
  const [sudokuData, setSudokuData] = useState([])
  const [selectedCell, setSelectedCell] = useState(null)
  const [timer, setTimer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [mistakes, setMistakes] = useState(0)

  // Load initial puzzle
  useEffect(() => {
    loadNewPuzzle()
  }, [difficulty])

  // Timer effect
  useEffect(() => {
    let interval = null
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1)
      }, 1000)
    } else if (!isPlaying && timer !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isPlaying, timer])

  const loadNewPuzzle = async () => {
    setLoading(true)
    setError(null)
    try {
      const puzzles = await puzzleService.getAll()
      const difficultyPuzzles = puzzles.filter(p => p.type === 'sudoku' && p.difficulty === difficulty) || []
      
      if (difficultyPuzzles.length > 0) {
        const randomPuzzle = difficultyPuzzles[Math.floor(Math.random() * difficultyPuzzles.length)]
        setSudokuData(randomPuzzle.data || generateEmptyGrid())
      } else {
        setSudokuData(generateEmptyGrid())
      }
      
      setTimer(0)
      setIsPlaying(false)
      setSelectedCell(null)
      setProgress(0)
      setMistakes(0)
    } catch (err) {
      setError(err.message)
      setSudokuData(generateEmptyGrid())
    } finally {
      setLoading(false)
    }
  }

  const generateEmptyGrid = () => {
    const grid = Array(9).fill().map(() => Array(9).fill(0))
    
    // Add some preset numbers based on difficulty
    const presetCounts = {
      easy: 35,
      medium: 28,
      hard: 22,
      expert: 17
    }
    
    const presetCount = presetCounts[difficulty] || 28
    const positions = []
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        positions.push([i, j])
      }
    }
    
    // Shuffle positions and fill some with numbers
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[positions[i], positions[j]] = [positions[j], positions[i]]
    }
    
    for (let i = 0; i < presetCount; i++) {
      const [row, col] = positions[i]
      grid[row][col] = Math.floor(Math.random() * 9) + 1
    }
    
    return grid
  }

  const handleCellClick = (row, col) => {
    if (!isPlaying) setIsPlaying(true)
    setSelectedCell({ row, col })
  }

  const handleNumberInput = (number) => {
    if (!selectedCell || sudokuData[selectedCell.row]?.[selectedCell.col] === undefined) return

    const newGrid = sudokuData.map(row => [...row])
    const oldValue = newGrid[selectedCell.row][selectedCell.col]
    
    if (oldValue === number) {
      newGrid[selectedCell.row][selectedCell.col] = 0
    } else {
      newGrid[selectedCell.row][selectedCell.col] = number
    }

    setSudokuData(newGrid)
    
    // Calculate progress
    const filledCells = newGrid.flat().filter(cell => cell !== 0).length
    const newProgress = Math.round((filledCells / 81) * 100)
    setProgress(newProgress)

    // Check if puzzle is complete
    if (filledCells === 81) {
      setIsPlaying(false)
      if (isValidSolution(newGrid)) {
        toast.success("🎉 Congratulations! Puzzle completed successfully!")
      } else {
        toast.error("Puzzle completed but contains errors. Keep trying!")
        setMistakes(prev => prev + 1)
      }
    }
  }

  const isValidSolution = (grid) => {
    // Simple validation - check if all numbers 1-9 appear in each row, column, and 3x3 box
    for (let i = 0; i < 9; i++) {
      const row = new Set()
      const col = new Set()
      
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] !== 0) row.add(grid[i][j])
        if (grid[j][i] !== 0) col.add(grid[j][i])
      }
      
      if (row.size !== 9 || col.size !== 9) return false
    }
    return true
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getCellClasses = (row, col, value) => {
    let classes = "sudoku-cell"
    
    if (selectedCell?.row === row && selectedCell?.col === col) {
      classes += " selected"
    } else if (selectedCell && (selectedCell.row === row || selectedCell.col === col)) {
      classes += " related"
    }
    
    if (value !== 0) {
      classes += " filled"
    }
    
    // Add thicker borders for 3x3 box separation
    if (row % 3 === 0) classes += " border-t-2"
    if (col % 3 === 0) classes += " border-l-2"
    if (row === 8) classes += " border-b-2"
    if (col === 8) classes += " border-r-2"
    
    return classes
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-surface-600">Loading your puzzle...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">Error loading puzzle: {error}</p>
        <button onClick={loadNewPuzzle} className="btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Sudoku Game Board */}
      <div className="xl:col-span-3">
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-heading font-bold text-surface-900 mb-1">Sudoku</h3>
              <p className="text-surface-600">Fill the grid so each row, column, and 3×3 box contains 1-9</p>
            </div>
            
            {/* Timer and Controls */}
            <div className="flex items-center gap-4">
              <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                <ApperIcon name="Clock" className="w-5 h-5 text-surface-600" />
                <span className="font-mono text-lg font-semibold">{formatTime(timer)}</span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded"
                >
                  <ApperIcon name={isPlaying ? "Pause" : "Play"} className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={loadNewPuzzle}
                className="btn-secondary"
              >
                <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
                New Puzzle
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-surface-600">Progress</span>
              <span className="text-sm font-medium text-surface-900">{progress}%</span>
            </div>
            <div className="w-full bg-surface-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Game Grid */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sudoku Grid */}
            <div className="flex-1 flex justify-center">
              <div className="grid grid-cols-9 gap-0 border-4 border-surface-800 rounded-lg overflow-hidden bg-white">
                {sudokuData.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      className={getCellClasses(rowIndex, colIndex, cell)}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell !== 0 ? cell : ''}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Number Pad */}
            <div className="w-full lg:w-auto">
              <h4 className="text-lg font-semibold text-surface-900 mb-4 text-center lg:text-left">Number Pad</h4>
              <div className="grid grid-cols-5 lg:grid-cols-3 gap-2 max-w-xs mx-auto lg:mx-0">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <button
                    key={number}
                    onClick={() => handleNumberInput(number)}
                    className="number-pad-btn"
                    disabled={!selectedCell}
                  >
                    {number}
                  </button>
                ))}
                {/* Erase button */}
                <button
                  onClick={() => handleNumberInput(0)}
                  className="number-pad-btn col-span-2 lg:col-span-3"
                  disabled={!selectedCell}
                >
                  <ApperIcon name="Eraser" className="w-5 h-5 mr-2" />
                  Erase
                </button>
              </div>
              
              {selectedCell && (
                <p className="text-sm text-surface-500 text-center lg:text-left mt-3">
                  Selected: Row {selectedCell.row + 1}, Column {selectedCell.col + 1}
                </p>
              )}
            </div>
          </div>

          {/* Game Stats */}
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-surface-600">
            <div className="flex items-center gap-2">
              <ApperIcon name="Target" className="w-4 h-4" />
              <span>Difficulty: <span className="font-semibold capitalize">{difficulty}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="AlertCircle" className="w-4 h-4" />
              <span>Mistakes: <span className="font-semibold">{mistakes}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Zap" className="w-4 h-4" />
              <span>Hints: <span className="font-semibold">Coming soon!</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="space-y-6">
        {/* Tips Card */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h4 className="text-lg font-heading font-semibold text-surface-900 mb-4">Sudoku Tips</h4>
          <div className="space-y-3 text-sm text-surface-600">
            <div className="flex items-start gap-2">
              <ApperIcon name="Lightbulb" className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
              <span>Look for cells with only one possible number</span>
            </div>
            <div className="flex items-start gap-2">
              <ApperIcon name="Eye" className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
              <span>Check rows, columns, and 3×3 boxes for missing numbers</span>
            </div>
            <div className="flex items-start gap-2">
              <ApperIcon name="Brain" className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
              <span>Use process of elimination to narrow down possibilities</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
          <h4 className="text-lg font-heading font-semibold text-surface-900 mb-4">Coming Soon</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white bg-opacity-50 rounded-lg">
              <ApperIcon name="HelpCircle" className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Smart Hints</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white bg-opacity-50 rounded-lg">
              <ApperIcon name="Users" className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">Multiplayer Mode</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white bg-opacity-50 rounded-lg">
              <ApperIcon name="BarChart" className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Detailed Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFeature