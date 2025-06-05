import jigsawPiecesData from '../mockData/jigsawPieces.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class JigsawService {
  constructor() {
    this.data = [...jigsawPiecesData]
    this.currentPuzzle = null
    this.gameState = {
      placedPieces: [],
      trayPieces: [],
      completedRegions: [],
      totalPieces: 0,
      placedCount: 0,
      startTime: null,
      endTime: null,
      rotations: 0,
      hints: 0
    }
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const puzzle = this.data.find(item => item.id === id)
    if (!puzzle) throw new Error('Jigsaw puzzle not found')
    return { ...puzzle }
  }

  async getByDifficulty(difficulty) {
    await delay(250)
    return this.data.filter(item => item.difficulty === difficulty).map(item => ({ ...item }))
  }

  async initializePuzzle(puzzleId) {
    await delay(400)
    const puzzle = await this.getById(puzzleId)
    
    this.currentPuzzle = puzzle
    const pieces = this.generatePuzzlePieces(puzzle)
    
    this.gameState = {
      placedPieces: [],
      trayPieces: [...pieces],
      completedRegions: [],
      totalPieces: pieces.length,
      placedCount: 0,
      startTime: new Date(),
      endTime: null,
      rotations: 0,
      hints: 0
    }
    
    return {
      puzzle: { ...puzzle },
      gameState: { ...this.gameState }
    }
  }

  generatePuzzlePieces(puzzle) {
    const pieces = []
    const { rows, cols, imageUrl } = puzzle
    const pieceWidth = 600 / cols
    const pieceHeight = 400 / rows
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const piece = {
          id: `${row}-${col}`,
          row,
          col,
          x: col * pieceWidth,
          y: row * pieceHeight,
          width: pieceWidth,
          height: pieceHeight,
          correctX: col * pieceWidth,
          correctY: row * pieceHeight,
          currentX: Math.random() * 200,
          currentY: Math.random() * 150,
          rotation: Math.floor(Math.random() * 4) * 90,
          isPlaced: false,
          edges: this.generatePieceEdges(row, col, rows, cols),
          imageSection: {
            sx: col * pieceWidth,
            sy: row * pieceHeight,
            sw: pieceWidth,
            sh: pieceHeight
          }
        }
        pieces.push(piece)
      }
    }
    
    return this.shuffleArray(pieces)
  }

  generatePieceEdges(row, col, rows, cols) {
    const edges = {
      top: row === 0 ? 'flat' : (Math.random() > 0.5 ? 'out' : 'in'),
      right: col === cols - 1 ? 'flat' : (Math.random() > 0.5 ? 'out' : 'in'),
      bottom: row === rows - 1 ? 'flat' : (Math.random() > 0.5 ? 'out' : 'in'),
      left: col === 0 ? 'flat' : (Math.random() > 0.5 ? 'out' : 'in')
    }
    
    // Ensure adjacent pieces have complementary edges
    if (row > 0 && edges.top !== 'flat') {
      edges.top = edges.top === 'out' ? 'in' : 'out'
    }
    if (col > 0 && edges.left !== 'flat') {
      edges.left = edges.left === 'out' ? 'in' : 'out'
    }
    
    return edges
  }

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  async rotatePiece(pieceId, direction = 'clockwise') {
    await delay(100)
    const piece = this.gameState.trayPieces.find(p => p.id === pieceId) ||
                  this.gameState.placedPieces.find(p => p.id === pieceId)
    
    if (!piece) throw new Error('Piece not found')
    
    const rotationDelta = direction === 'clockwise' ? 90 : -90
    piece.rotation = (piece.rotation + rotationDelta) % 360
    this.gameState.rotations++
    
    return { ...piece }
  }

  async placePiece(pieceId, x, y) {
    await delay(200)
    const piece = this.gameState.trayPieces.find(p => p.id === pieceId)
    if (!piece) throw new Error('Piece not found in tray')
    
    // Check if placement is close to correct position
    const tolerance = 20
    const isCorrectPosition = 
      Math.abs(x - piece.correctX) < tolerance && 
      Math.abs(y - piece.correctY) < tolerance &&
      piece.rotation % 360 === 0
    
    if (isCorrectPosition) {
      // Snap to correct position
      piece.currentX = piece.correctX
      piece.currentY = piece.correctY
      piece.isPlaced = true
      
      // Move from tray to placed pieces
      this.gameState.trayPieces = this.gameState.trayPieces.filter(p => p.id !== pieceId)
      this.gameState.placedPieces.push(piece)
      this.gameState.placedCount++
      
      // Check for completion
      if (this.gameState.placedCount === this.gameState.totalPieces) {
        this.gameState.endTime = new Date()
      }
      
      return {
        placed: true,
        piece: { ...piece },
        gameState: { ...this.gameState }
      }
    } else {
      // Update position but keep in tray
      piece.currentX = x
      piece.currentY = y
      
      return {
        placed: false,
        piece: { ...piece },
        gameState: { ...this.gameState }
      }
    }
  }

  async returnPieceToTray(pieceId) {
    await delay(150)
    const piece = this.gameState.placedPieces.find(p => p.id === pieceId)
    if (!piece) throw new Error('Piece not found in placed pieces')
    
    piece.isPlaced = false
    piece.currentX = Math.random() * 200
    piece.currentY = Math.random() * 150
    
    this.gameState.placedPieces = this.gameState.placedPieces.filter(p => p.id !== pieceId)
    this.gameState.trayPieces.push(piece)
    this.gameState.placedCount--
    
    return {
      piece: { ...piece },
      gameState: { ...this.gameState }
    }
  }

  async getHint() {
    await delay(300)
    if (!this.gameState.trayPieces.length) return null
    
    // Find a corner or edge piece to hint
    const cornerPieces = this.gameState.trayPieces.filter(piece => {
      const edges = piece.edges
      const flatEdges = Object.values(edges).filter(edge => edge === 'flat').length
      return flatEdges >= 2
    })
    
    const hintPiece = cornerPieces.length > 0 ? 
      cornerPieces[0] : 
      this.gameState.trayPieces[0]
    
    this.gameState.hints++
    
    return {
      piece: { ...hintPiece },
      correctPosition: {
        x: hintPiece.correctX,
        y: hintPiece.correctY
      },
      gameState: { ...this.gameState }
    }
  }

  async checkCompletion() {
    await delay(100)
    const isComplete = this.gameState.placedCount === this.gameState.totalPieces
    
    if (isComplete && !this.gameState.endTime) {
      this.gameState.endTime = new Date()
    }
    
    return {
      isComplete,
      gameState: { ...this.gameState }
    }
  }

  async getGameStats() {
    await delay(100)
    const stats = {
      ...this.gameState,
      completionPercentage: Math.round((this.gameState.placedCount / this.gameState.totalPieces) * 100),
      elapsedTime: this.gameState.startTime ? 
        Math.floor((new Date() - this.gameState.startTime) / 1000) : 0
    }
    
    if (this.gameState.endTime && this.gameState.startTime) {
      stats.totalTime = Math.floor((this.gameState.endTime - this.gameState.startTime) / 1000)
    }
    
    return stats
  }

  async create(puzzleData) {
    await delay(400)
    const newPuzzle = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...puzzleData
    }
    this.data.push(newPuzzle)
    return { ...newPuzzle }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Jigsaw puzzle not found')
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Jigsaw puzzle not found')
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new JigsawService()