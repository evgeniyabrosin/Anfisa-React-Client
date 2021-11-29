import { datasetPage } from '../page-objects/app/datasets-page'
import { decisionTreesPage } from '../page-objects/app/decision-trees-page'

describe('XL Dataset should be opened in decision tree', () => {
  it('should open decision tree and choose Hearing Loss v.5 filter | Test #2', () => {
    datasetPage.visit('/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    //Somehow check that hearing loss was loaded
  })
})
