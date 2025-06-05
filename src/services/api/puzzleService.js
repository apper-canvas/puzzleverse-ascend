import puzzlesData from '../mockData/puzzles.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class PuzzleService {
  constructor() {
    this.data = [...puzzlesData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const puzzle = this.data.find(item => item.id === id)
    if (!puzzle) throw new Error('Puzzle not found')
    return { ...puzzle }
  }

  async getByType(type) {
    await delay(250)
    return this.data.filter(item => item.type === type).map(item => ({ ...item }))
  }

  async getByDifficulty(difficulty) {
    await delay(250)
    return this.data.filter(item => item.difficulty === difficulty).map(item => ({ ...item }))
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
    if (index === -1) throw new Error('Puzzle not found')
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Puzzle not found')
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
async getJigsawPuzzles() {
    await delay(250)
    return this.data.filter(item => item.type === 'jigsaw').map(item => ({ ...item }))
  }

  async getJigsawByDifficulty(difficulty) {
    await delay(250)
    const jigsawPuzzles = this.data.filter(item => item.type === 'jigsaw' && item.difficulty === difficulty)
    return jigsawPuzzles.map(item => ({ ...item }))
  }
}

export default new PuzzleService()