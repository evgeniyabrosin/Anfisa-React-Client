import { DecisionTreesResultsDataCy } from '../../../src/components/data-testid/decision-tree-results.cy'
import { Label } from './label'

export class StepLabel extends Label {
  readonly labelText: string

  constructor(selector: string, labelText: string) {
    super(selector, labelText)
    this.labelText = labelText
  }

  findStepAndExclude(text?: string) {
    return this.getElement()
      .contains(text!)
      .parents(`[data-testid = "${DecisionTreesResultsDataCy.stepCard}"]`)
      .within(() => {
        cy.get(
          `[data-testid = "${DecisionTreesResultsDataCy.excludeInfo}"]`,
        ).click()
      })
  }
}
