import * as faker from 'faker'

export class testData {
  static getFakeData(numWords: number) {
    return faker.random.words(numWords)
  }
}
