import achievementsData from '../mockData/achievements.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class AchievementService {
  constructor() {
    this.data = [...achievementsData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const achievement = this.data.find(item => item.id === id)
    if (!achievement) throw new Error('Achievement not found')
    return { ...achievement }
  }

  async getUnlocked() {
    await delay(250)
    return this.data.filter(item => item.unlockedAt).map(item => ({ ...item }))
  }

  async create(achievementData) {
    await delay(400)
    const newAchievement = {
      id: Date.now().toString(),
      unlockedAt: null,
      ...achievementData
    }
    this.data.push(newAchievement)
    return { ...newAchievement }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Achievement not found')
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Achievement not found')
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new AchievementService()