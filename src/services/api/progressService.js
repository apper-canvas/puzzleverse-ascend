import progressData from '../mockData/progress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ProgressService {
  constructor() {
    this.data = [...progressData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const progress = this.data.find(item => item.puzzleId === id)
    if (!progress) throw new Error('Progress record not found')
    return { ...progress }
  }

  async getByPuzzleId(puzzleId) {
    await delay(250)
    return this.data.filter(item => item.puzzleId === puzzleId).map(item => ({ ...item }))
  }

  async create(progressData) {
    await delay(400)
    const newProgress = {
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      completed: false,
      score: 0,
      hintsUsed: 0,
      moves: [],
      ...progressData
    }
    this.data.push(newProgress)
    return { ...newProgress }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.puzzleId === id)
    if (index === -1) throw new Error('Progress record not found')
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(item => item.puzzleId === id)
    if (index === -1) throw new Error('Progress record not found')
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new ProgressService()