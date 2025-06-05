import dailyChallengesData from '../mockData/dailyChallenges.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class DailyChallengeService {
  constructor() {
    this.data = [...dailyChallengesData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const challenge = this.data.find(item => item.id === id)
    if (!challenge) throw new Error('Daily challenge not found')
    return { ...challenge }
  }

  async getTodaysChallenge() {
    await delay(250)
    const today = new Date().toISOString().split('T')[0]
    const todaysChallenge = this.data.find(item => item.date === today)
    return todaysChallenge ? { ...todaysChallenge } : null
  }

  async create(challengeData) {
    await delay(400)
    const newChallenge = {
      id: Date.now().toString(),
      participants: 0,
      topScores: [],
      ...challengeData
    }
    this.data.push(newChallenge)
    return { ...newChallenge }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Daily challenge not found')
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Daily challenge not found')
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new DailyChallengeService()