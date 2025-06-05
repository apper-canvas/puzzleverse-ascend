import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary/5 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <ApperIcon name="PuzzleIcon" className="w-24 h-24 text-primary mx-auto mb-4" />
          <h1 className="text-6xl font-heading font-bold text-surface-900 mb-2">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-surface-700 mb-4">
            Puzzle Piece Missing!
          </h2>
          <p className="text-surface-600 mb-8">
            The page you're looking for seems to have vanished like a missing puzzle piece. 
            Let's get you back to solving puzzles!
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <ApperIcon name="Home" className="w-5 h-5" />
          Back to Puzzles
        </Link>
      </div>
    </div>
  )
}

export default NotFound