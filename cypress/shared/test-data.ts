import { faker } from '@faker-js/faker'
export class TestData {
  private static runId: string = faker.random.alphaNumeric(10)

  /**
   * Generate a random sentence
   * @param numWords amount of words in the sentence
   * @returns
   */
  static getSentence(numWords: number): string {
    return faker.random.words(numWords)
  }

  /**
   * Returns unique id for the current run
   */
  static getRunId(): string {
    return TestData.runId
  }
}
