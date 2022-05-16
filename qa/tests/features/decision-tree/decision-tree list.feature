Feature: Decision Tree Panel, Decision Trees list
  As the Anfisa user I want to see the Decision Trees list on the "Decision Tree Panel" page
  
Scenario Outline: Decision Tree panel can be opened for a dataset
	Given Anfisa site was open
	When user clicks "<Dataset name>" dataset on the left panel
	And clicks on the "Decision Tree Panel" dropdown
	And the "Decision Tree Panel" should be open
		
Examples:
	| <Dataset name>          |
	| PGP3140_wgs_pane l_hl   |
	| xl_PGP3140_wgs_NIST-4_2 |
		
Scenario Outline: Decision Tree can be loaded for the dataset
	Given "Decision Tree Panel" was open for an XL dataset
	When User clicks the "Select" dropdown in the "Decision trees" section
	And the list of Decision trees is displayed
	And User clicks the <Decision tree name> decision tree
	Then chosen decision tree should be loaded
		
Examples:
	| <Decision tree name>  |
	| ⏚Hearing Loss, v.5    |
	| ⏚Damaging_Predictions |

Scenario Outline: Add new step to the Decision tree
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  ("ADF")
	And chosen decision tree is loaded
	And user clicks setting button near the first step (three dots)
	And Setting panel is opened
	And user clicks "Add step Before" or "Add step after"
	Then New step should be added to the decision tree.

Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |

Scenario Outline: Negate step
	
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  ("ADF")
	And chosen decision tree is loaded
	And user clicks setting button near the first step (three dots)
	And Setting panel is opened
	And user clicks "Delete"
	Then the step should be deleted

Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |

Scenario Outline: Modify Decision tree
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  ("ADF")
	And chosen decision tree is loaded
	And clicks "Actions" near decision tree panel
	And action panel is opened
	And user clicks "Modify"
	Then decision three should not be Modified (when there are no changes in the tree)


Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |

Scenario Outline: Delete custom decision Tree
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the custom decision trees ("ADF")
	And chosen custom decision tree is loaded
	And user clicks "Actions" near "Decision trees"
	And Action panel is opened
	And user clicks "Delete"
	Then created decision tree should be deleted.


Scenario Outline: Delete default decision Tree
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the <default decision tree>("ADF")
	And chosen  decision tree is loaded
	And user clicks "Actions" near "Decision trees"
	And Action panel is opened
	And user clicks "Delete"
	Then created decision tree should be not deleted.


Examples:
	| <default decision tree> |
	| ⏚BGM Red Button         |
	| ⏚BGM Research           |
	